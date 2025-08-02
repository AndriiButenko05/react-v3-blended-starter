import style from "./Loader.module.css";
import { ClipLoader } from "react-spinners";
import { type CSSProperties } from "react";

interface LoaderProps {
  color: string;
  loading: boolean;
  override: CSSProperties;
}

export default function Loader({ color, loading, override }: LoaderProps) {
  return (
    <div className={style.backdrop}>
      {
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    </div>
  );
}
