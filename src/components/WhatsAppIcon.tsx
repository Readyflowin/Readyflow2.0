type WhatsAppIconProps = {
  className?: string;
  size?: number;
};

export default function WhatsAppIcon({
  className = "h-5 w-5",
  size,
}: WhatsAppIconProps) {
  return (
    <img
      src="/whatsapp.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
    />
  );
}
