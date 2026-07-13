import { WEATHER_ICON_MAP } from "../../constants/weatherIconMap";

function MetricIcon({
    icon,
    size = 28,
    className = "",
    alt = "",
}) {

    const src = WEATHER_ICON_MAP[icon?.toLocaleLowerCase()] ?? WEATHER_ICON_MAP.unknown;

    return (
        <img
            src={src}
            width={size}
            height={size}
            className={className}
            alt={alt || icon}
            loading="lazy"
            draggable={false}
        />
    );
}

export default MetricIcon;