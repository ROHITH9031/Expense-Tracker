import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  required = true,
  icon: Icon,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="input-wrapper">
      {Icon && (
        <Icon
          size={18}
          className="input-icon"
        />
      )}

      <input
        type={
          showPassword
            ? "text"
            : "password"
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />

      <button
        type="button"
        className="password-toggle"
        onClick={() =>
          setShowPassword((prev) => !prev)
        }
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;