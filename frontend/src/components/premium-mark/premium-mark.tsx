type PremiumMarkProps = {
  className: string;
};

function PremiumMark({ className }: PremiumMarkProps) {
  return (
    <div className={`${className}__mark`}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
