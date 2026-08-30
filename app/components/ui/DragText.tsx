"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "../../lib/i18n";

type DragTextProps = {
  text: string;
  outline?: boolean;
  "data-type"?: string;
};

export default function DragText({ text, outline }: DragTextProps) {
  const { t } = useI18n();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // kept in a ref so switching language does not restart the drag effect
  const messagesRef = useRef(t.drag.messages);

  useEffect(() => {
    messagesRef.current = t.drag.messages;
  }, [t]);

  const isDragging = useRef(false);
  const locked = useRef(false);

  const pos = useRef({ x: 0, y: 0 });
  const lastTouch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cursor = document.getElementById("global-cursor");
    const bubble = cursor?.querySelector(".cursor-bubble");

    if (!wrapper || !cursor || !bubble) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      if (locked.current) return;
      isDragging.current = true;

      if ("touches" in e && e.touches.length > 0) {
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }

      const selectionBox = wrapper.parentElement?.querySelector(".selection-box");
      if (selectionBox) selectionBox.classList.add("figma-mode");
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current || locked.current) return;

      let movementX = 0;
      let movementY = 0;

      if ("touches" in e && e.touches.length > 0) {
        e.preventDefault();
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        movementX = clientX - lastTouch.current.x;
        movementY = clientY - lastTouch.current.y;
        lastTouch.current = { x: clientX, y: clientY };
      } else if ("movementX" in e) {
        movementX = e.movementX;
        movementY = e.movementY;
      }

      pos.current.x += movementX;
      pos.current.y += movementY;

      gsap.set(wrapper, {
        x: pos.current.x,
        y: pos.current.y,
      });
    };

    const onUp = () => {
      if (!isDragging.current) return;

      isDragging.current = false;
      const selectionBox = wrapper.parentElement?.querySelector(".selection-box");
      if (selectionBox) selectionBox.classList.remove("figma-mode");

      startSystem();
    };

    const startSystem = () => {
      locked.current = true;

      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - pos.current.x;
      const centerY = rect.top + rect.height / 2 - pos.current.y;

      const startCursorX = window.innerWidth + 100;
      const startCursorY = -100;

      const follow = {
        x: pos.current.x,
        y: pos.current.y,
      };

      const tl = gsap.timeline();

      tl.set(cursor, {
        x: startCursorX,
        y: startCursorY,
        opacity: 1,
      });

      tl.set(bubble, { textContent: "", opacity: 0 });

      tl.to(cursor, {
        x: centerX + pos.current.x,
        y: centerY + pos.current.y,
        duration: 1.0,
        ease: "power3.out",
      });

      tl.to(wrapper, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });

      tl.add(() => typeText(bubble));

      tl.to(follow, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        onUpdate: () => {
          gsap.set(wrapper, { x: follow.x, y: follow.y });
        },
      }, "dragBack");

      tl.to(cursor, {
        x: centerX,
        y: centerY,
        duration: 1.5,
        ease: "power4.out",
      }, "dragBack");

      tl.add(() => {
        pos.current = { x: 0, y: 0 };
      });

      tl.to(cursor, {
        x: window.innerWidth + 120,
        y: -120,
        duration: 0.5,
        ease: "power2.in",
        onStart: () => {
          gsap.to(bubble, { opacity: 0, duration: 0.2 });
        },
      }, "+=0.5");

      tl.to(cursor, { opacity: 0, duration: 0.2 });

      tl.add(() => {
        locked.current = false;
      });
    };

    const typeText = (target: Element) => {
      const messages = messagesRef.current;
      const msg = messages[Math.floor(Math.random() * messages.length)];

      target.textContent = "";

      gsap.fromTo(
        target,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );

      let i = 0;
      const interval = window.setInterval(() => {
        target.textContent = msg.substring(0, i);
        i += 1;

        if (i > msg.length) {
          window.clearInterval(interval);
        }
      }, 60);
    };

    const onTouchDown = (e: TouchEvent) => onDown(e);
    const onTouchMove = (e: TouchEvent) => onMove(e);

    wrapper.addEventListener("mousedown", onDown);
    wrapper.addEventListener("touchstart", onTouchDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      wrapper.removeEventListener("mousedown", onDown);
      wrapper.removeEventListener("touchstart", onTouchDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="group relative inline-block">
      <div className="selection-box">
        <div className="handle tl"></div>
        <div className="handle tr"></div>
        <div className="handle bl"></div>
        <div className="handle br"></div>
      </div>

      <div ref={wrapperRef}>
        <div className={`drag-text ${outline ? "outline" : ""}`}>
          {text}
        </div>
      </div>
    </div>
  );
}
