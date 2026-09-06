function AlertMessage({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-message alert-${type}`} role="status">
      <span className="alert-icon" aria-hidden="true">{type === 'success' ? '✓' : '!'}</span>
      <span>{message}</span>
      <button type="button" className="alert-close" onClick={onClose} aria-label="Dismiss message">
        ×
      </button>
    </div>
  );
}

export default AlertMessage;
