import { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TawkReactMessenger = () => {
  const tawkMessengerRef = useRef();
  const propertyId = process.env.REACT_APP_TAWK_PROPERTY_ID;
  const widgetId = process.env.REACT_APP_TAWK_WIDGET_ID;

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
      ref={tawkMessengerRef}
    />
  );
};

export default TawkReactMessenger;
