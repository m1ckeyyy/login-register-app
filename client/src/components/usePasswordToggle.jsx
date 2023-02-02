import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = (
    <div
      style={{ maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => {
        setVisibility((visibility) => !visibility);
      }}
    >
      <FontAwesomeIcon icon={visible ? 'eye-slash' : 'eye'} style={{ maxWidth: 20, maxHeight: 20, minWidth: 20, minHeight: 20 }} />
    </div>
  );
  const inputType = visible ? 'text' : 'password';
  return [inputType, Icon];
};

export default usePasswordToggle;
