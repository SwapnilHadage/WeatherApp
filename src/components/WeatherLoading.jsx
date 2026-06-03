import { WiCloud, WiDayCloudy, WiRaindrop, WiStrongWind, WiThermometer } from "react-icons/wi";

const loadingCardStyle = (index) => ({
  "--delay": `${index * 90}ms`,
});

function ShimmerBlock({ className = "" }) {
  return <div className={`weather-shimmer rounded-md bg-gray-300/80 ${className}`} />;
}

function LoadingBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700">
      <span className="h-2 w-2 rounded-full bg-gray-500 weather-pulse" />
      <span>{children}</span>
    </div>
  );
}

function WeatherGlyph({ compact = false }) {
  return (
    <div className={`${compact ? "h-20 w-20" : "h-32 w-32"} relative grid place-items-center text-gray-600`}>
      <WiDayCloudy className={`${compact ? "size-16" : "size-28"} weather-float`} />
      <WiRaindrop className="absolute bottom-3 left-5 size-5 text-gray-500 weather-drop" />
      <WiRaindrop className="absolute bottom-1 right-6 size-4 text-gray-400 weather-drop weather-drop-late" />
    </div>
  );
}

export function CurrentWeatherLoading() {
  const stats = ["Temp", "Wind", "Humidity"];

  return (
    <section className="weather-loading-shell m-3 flex h-80 w-[min(37.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-300 bg-gray-300/80 p-3 pr-6">
        <LoadingBadge>Loading current weather</LoadingBadge>
        <ShimmerBlock className="h-4 w-32" />
      </div>

      <div className="flex flex-1 items-center gap-5 px-5">
        <div className="flex flex-col gap-4">
          <ShimmerBlock className="h-20 w-36 rounded-xl" />
          <ShimmerBlock className="h-5 w-44" />
        </div>
        <div className="flex flex-1 justify-center">
          <WeatherGlyph />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 pb-5">
        {stats.map((stat, index) => (
          <div
            className="weather-loader-card rounded-xl border border-gray-300 bg-white/70 p-3"
            key={stat}
            style={loadingCardStyle(index)}
          >
            <ShimmerBlock className="mb-3 h-3 w-12" />
            <ShimmerBlock className="h-4 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CurrentMetricsLoading() {
  const icons = [WiThermometer, WiStrongWind, WiRaindrop, WiCloud, WiDayCloudy];

  return (
    <section className="weather-loading-shell m-3 flex min-h-20 w-auto flex-wrap items-center justify-evenly gap-3 overflow-hidden bg-gray-300 p-3">
      {icons.map((Icon, index) => (
        <div
          className="weather-loader-card flex h-16 min-w-28 flex-col justify-center rounded-lg border border-gray-300 bg-gray-100/80 px-3"
          key={index}
          style={loadingCardStyle(index)}
        >
          <div className="flex items-center gap-2">
            <Icon className="size-7 text-gray-600 weather-float" />
            <ShimmerBlock className="h-3 w-16" />
          </div>
          <ShimmerBlock className="mt-2 h-4 w-20 self-center" />
        </div>
      ))}
    </section>
  );
}

export function TodayWeatherLoading() {
  const cards = Array.from({ length: 12 }, (_, index) => index);

  return (
    <section className="size-full min-h-full bg-white p-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm">
        <div>
          <LoadingBadge>Loading today's forecast</LoadingBadge>
          <ShimmerBlock className="mt-3 h-4 w-56" />
        </div>
        <div className="flex gap-2">
          <span className="weather-dot" />
          <span className="weather-dot" style={{ "--delay": "160ms" }} />
          <span className="weather-dot" style={{ "--delay": "320ms" }} />
        </div>
      </div>

      <div className="flex flex-row flex-wrap content-start items-start justify-center gap-4">
        {cards.map((card) => (
          <article
            className="weather-loader-card h-40 w-40 rounded-xl border border-gray-400 bg-gray-200 p-2"
            key={card}
            style={loadingCardStyle(card)}
          >
            <div className="flex h-20 items-start justify-between">
              <WeatherGlyph compact />
              <ShimmerBlock className="mt-1 h-3 w-14" />
            </div>
            <ShimmerBlock className="mx-auto mt-3 h-4 w-28" />
            <ShimmerBlock className="mx-auto mt-4 h-4 w-24" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function WeekWeatherLoading() {
  const days = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="size-full border border-gray-200 bg-white p-[2%]">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm">
        <div>
          <LoadingBadge>Loading weekly forecast</LoadingBadge>
          <ShimmerBlock className="mt-3 h-4 w-48" />
        </div>
        <WiStrongWind className="size-10 text-gray-600 weather-wind" />
      </div>

      <div className="flex w-full flex-row flex-nowrap gap-2 overflow-hidden rounded-xl">
        {days.map((day) => (
          <article
            className="weather-loader-card flex h-50 min-w-32 flex-1 basis-0 flex-col rounded-xl border border-gray-400 bg-gray-200 p-2"
            key={day}
            style={loadingCardStyle(day)}
          >
            <div className="flex h-1/2 items-start justify-between">
              <WeatherGlyph compact />
              <ShimmerBlock className="mt-1 h-3 w-14" />
            </div>
            <ShimmerBlock className="mx-auto mt-3 h-5 w-24" />
            <ShimmerBlock className="mx-auto mt-5 h-4 w-20" />
          </article>
        ))}
      </div>
    </section>
  );
}
