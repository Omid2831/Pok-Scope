import TypeColors from "/src/utils/TypeColors.js";
import TypeFonts from "/src/utils/TypeFonts.js";

function ErrorMessage({ message }) {
  {/* If there is no error message, render nothing (avoid empty space) */}
  if (!message) return null;

  return (
    <p
      className={`${TypeColors.fire} text-center`}
      style={{ fontFamily: TypeFonts.DMSerifText }}
      >
      {message}
    </p>
  );
}

export default ErrorMessage;
