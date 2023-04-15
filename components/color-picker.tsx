import { FC, useState } from 'react';
import { SketchPicker } from 'react-color';

interface IColorPicker {
  open: boolean;
  setOpen: (_o: boolean) => void;
  color: string;
  setColor: (_c: string) => void;
}

const ColorPicker: FC<IColorPicker> = ({ setOpen, color, setColor }) => {
  const [localColor, setLocalColor] = useState(color);
  return (
    <div className="absolute z-10">
      <div
        className="fixed top-0 left-0 bottom-0 right-0"
        onClick={() => {
          setColor(localColor);
          setOpen(false);
        }}
      />
      <SketchPicker
        color={localColor}
        onChangeComplete={(color) => setLocalColor(color.hex)}
        className="mt-2 text-primary"
      />
    </div>
  );
};

export default ColorPicker;
