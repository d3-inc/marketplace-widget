import { Button } from '../../components/ui/button.js';
import { cdnImages } from '../../config/images';
import type { WidgetTheme } from '../../types/widget';

type WidgetButtonProps = {
  onClick: () => void;
  isWidgetOpen: boolean;
  theme: WidgetTheme;
};

export const WidgetButton = ({ onClick, isWidgetOpen, theme }: WidgetButtonProps) => {
  return (
    <div className="w-[50px] h-[50px]">
      <Button
        tabIndex={0}
        aria-haspopup="true"
        className="p-0 m-0 border-none w-full"
        aria-label={isWidgetOpen ? 'Close D3 widget' : 'Open D3 Widget'}
        onClick={onClick}
      >
        <img
          className="object-cover object-center w-full h-auto"
          src={theme === 'dark' ? cdnImages.d3Light : cdnImages.d3Dark}
          alt="D3 Widget"
        />
      </Button>
    </div>
  );
};
