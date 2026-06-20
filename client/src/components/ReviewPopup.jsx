import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ReviewPopup = ({ onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-3xl border bg-white p-6 shadow-xl">
      <button
        onClick={() => {
          localStorage.setItem("reviewPopupDismissed", Date.now());

          onClose();
        }}
        className="absolute right-4 top-4 text-gray-500 transition hover:text-black"
      >
        <FaTimes size={16} />
      </button>

      <h3 className="text-xl font-semibold">Enjoying Your Lessons?</h3>

      <p className="mt-3 text-sm text-gray-600">
        We'd love to hear about your experience learning Tagalog.
      </p>

      <div className="mt-5 flex gap-3">
        <Link
          to="/student/review"
          className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
        >
          Leave Review
        </Link>

        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm transition hover:bg-gray-100"
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
