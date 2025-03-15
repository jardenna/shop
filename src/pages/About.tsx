import { FC, useState } from 'react';
import Drag from '../drag/Drag';
import ProductPrice from '../features/currency/components/ProductPrice';
const About: FC = () => {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  return (
    <section>
      <ProductPrice price={10200} />

      <Drag onDragMove={handleDragMove}>
        <div
          style={{
            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          }}
        >
          <div className="test">hello</div>
        </div>
      </Drag>
    </section>
  );
};
export default About;
