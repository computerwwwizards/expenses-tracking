

export interface ExpensesSummaryProps {
  readonly expenses: Array<Readonly<{ groupName: string; amount: number; color: string }>>;
  readonly outerRadius?: number;
  readonly labelRadius?: number;
  readonly groupNameRadius?: number;
  readonly outerLabelClassName?: string;
  readonly innerLabelClassName?: string;
  readonly width?: number;
  readonly height?: number;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    "M",
    centerX,
    centerY,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

export default function ExpensesSummary({
  expenses,
  outerRadius = 120,
  labelRadius = 135,
  groupNameRadius = 75,
  outerLabelClassName = "text-xs font-bold fill-gray-800",
  innerLabelClassName = "text-xs font-semibold fill-white",
  width = 150,
  height = 150,
}: ExpensesSummaryProps) {
  const total = expenses.reduce((prev, { amount }) => prev + amount, 0);
  const centerX = 150;
  const centerY = 150;

  let currentAngle = 0;

  return (
    <svg
      viewBox="0 0 300 300"
      width={width}
      height={height}
      className="w-full h-full"
      style={{ margin: "0 auto" }}
    >
      {expenses.map(({ groupName, amount, color }, index) => {
        const percentage = (amount / total) * 100;
        const sliceAngle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        const midAngle = (startAngle + endAngle) / 2;

        const labelPos = polarToCartesian(
          centerX,
          centerY,
          labelRadius,
          midAngle
        );

        const namePos = polarToCartesian(
          centerX,
          centerY,
          groupNameRadius,
          midAngle
        );

        currentAngle = endAngle;

        return (
          <g key={`${groupName}-${index}`}>
            {sliceAngle >= 359.9 ? (
              <circle
                cx={centerX}
                cy={centerY}
                r={outerRadius}
                fill={color}
                stroke="white"
                strokeWidth="2"
                opacity="0.9"
              />
            ) : (
              <path
                d={describeArc(
                  centerX,
                  centerY,
                  outerRadius,
                  startAngle,
                  endAngle
                )}
                fill={color}
                stroke="white"
                strokeWidth="2"
                opacity="0.9"
              />
            )}

            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={outerLabelClassName}
              pointerEvents="none"
            >
              {percentage.toFixed(1)}%
            </text>

            <text
              x={namePos.x}
              y={namePos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={innerLabelClassName}
              pointerEvents="none"
            >
              {groupName}
            </text>
          </g>
        );
      })}
    </svg>
  );
}