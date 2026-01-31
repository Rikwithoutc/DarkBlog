import Spline from '@splinetool/react-spline';

export default function SplineComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <Spline
        scene="https://prod.spline.design/4HEiq-Klpk6EGIrY/scene.splinecode"
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
}