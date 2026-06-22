import foodData from "../data/foods.json";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_VERSION,
  DATA_SOURCE_LINK_LABEL,
  DATA_SOURCE_URL,
  FEEDBACK_EMAIL,
  MADE_BY,
} from "../constants/constant";

interface InfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{children}</span>
    </div>
  );
}

export default function InfoOverlay({ isOpen, onClose }: InfoOverlayProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl transition-transform duration-300 ease-in-out pb-[env(safe-area-inset-bottom,0px)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Title row + close button */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h2 className="text-lg font-bold text-gray-900">About</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* App description */}
        <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
          {APP_DESCRIPTION}
        </p>

        {/* Info rows */}
        <div className="px-6 pt-0">
          <div className="bg-gray-50 rounded-2xl px-4">
            <Row label="App Name">{APP_NAME}</Row>
            <Row label="Items in database">{foodData.length} food items</Row>
            <Row label="Version">{APP_VERSION}</Row>
            <Row label="Data source">
              <a
                href={DATA_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                {DATA_SOURCE_LINK_LABEL} ↗
              </a>
            </Row>
            <Row label="Feedback">
              <a
                href={`mailto:${FEEDBACK_EMAIL}`}
                className="text-primary underline underline-offset-2"
              >
                Send feedback →
              </a>
            </Row>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6 mb-6 px-6">
          {MADE_BY}
        </p>
      </div>
    </>
  );
}
