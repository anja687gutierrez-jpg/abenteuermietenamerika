import { LiquidMetal } from '@paper-design/shaders-react';

type LiquidMetalButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  speed?: number;
  repetition?: number;
  softness?: number;
  shiftRed?: number;
  shiftBlue?: number;
  distortion?: number;
  contour?: number;
  angle?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
};

export function LiquidMetalButton({
  children,
  className = '',
  speed = 0.6,
  repetition = 4,
  softness = 0.5,
  shiftRed = 0.3,
  shiftBlue = 0.3,
  distortion = 0,
  contour = 0,
  angle = 45,
  scale = 8,
  offsetX = 0.1,
  offsetY = -0.1,
  ...props
}: LiquidMetalButtonProps) {
  return (
    <a className={`liquid-metal-btn ${className}`} {...props}>
      <LiquidMetal
        className="liquid-metal-shader"
        shape="none"
        speed={speed}
        repetition={repetition}
        softness={softness}
        shiftRed={shiftRed}
        shiftBlue={shiftBlue}
        distortion={distortion}
        contour={contour}
        angle={angle}
        scale={scale}
        offsetX={offsetX}
        offsetY={offsetY}
      />
      <div className="liquid-metal-inner" />
      <span className="liquid-metal-label">{children}</span>
    </a>
  );
}
