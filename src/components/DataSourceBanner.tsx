import {
  DATA_SOURCE_LINK_LABEL,
  DATA_SOURCE_TEXT,
  DATA_SOURCE_TEXT_SHORT,
  DATA_SOURCE_URL,
} from "../constants/constant";

export default function DataSourceBanner() {
  return (
    <div className="shrink-0 w-full bg-gray-100 border-b border-gray-200 px-4 py-1.5 text-center">
      <p className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="sm:hidden">{DATA_SOURCE_TEXT_SHORT}</span>
        <span className="hidden sm:inline">{DATA_SOURCE_TEXT}</span>
        {" · "}
        <a
          href={DATA_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-600 hover:text-primary transition-colors"
        >
          {DATA_SOURCE_LINK_LABEL} ↗
        </a>
      </p>
    </div>
  );
}
