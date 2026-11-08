import Image from "next/image";
import { Fragment } from "react";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-portrait">
        <Image
          className="hero-photo"
          src={profile.image.src}
          alt={profile.image.alt}
          width={576}
          height={576}
          sizes="(max-width: 760px) 9rem, 18rem"
          preload
        />
        <svg className="hero-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle cx="50" cy="50" r="49" pathLength={1} />
        </svg>
      </div>

      <div>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-tagline">
          {profile.tagline.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <span className="hero-dot" aria-hidden="true" />}
              <span>{item}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
