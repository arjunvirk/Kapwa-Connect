import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getMCQResults } from "../actions/mcqAttemptActions";

const MCQResults = () => {
  const dispatch = useDispatch();

  // MCQ LIST

  const mcqList = useSelector((state) => state.mcqList);

  const { mcqs } = mcqList;

  // MCQ RESULTS

  const mcqResults = useSelector((state) => state.mcqResults);

  const { loading, error, results } = mcqResults;

  // LOAD FIRST MCQ RESULTS

  useEffect(() => {
    if (mcqs?.length > 0) {
      dispatch(getMCQResults(mcqs[0]._id));
    }
  }, [dispatch, mcqs]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">MCQ Results</h1>

          <p className="mt-3 text-gray-600">
            Review student quiz submissions and scores.
          </p>
        </div>

        {/* MCQ SELECT */}

        {mcqs?.length > 0 && (
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">Select MCQ</label>

            <select
              onChange={(e) => dispatch(getMCQResults(e.target.value))}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            >
              {mcqs.map((mcq) => (
                <option key={mcq._id} value={mcq._id}>
                  {mcq.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading results...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && results?.length === 0 && (
          <div className="rounded-3xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">No Attempts Yet</h2>

            <p className="mt-3 text-gray-500">
              Student MCQ attempts will appear here.
            </p>
          </div>
        )}

        {/* Results */}

        {!loading && !error && results?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result) => (
              <div
                key={result._id}
                className="rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Top */}

                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full border px-3 py-1 text-xs">
                    Submitted
                  </span>

                  <span className="text-sm text-gray-500">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Student */}

                <h2 className="text-2xl font-semibold">
                  {result.student?.name}
                </h2>

                <p className="mt-3 break-all text-sm text-gray-600">
                  {result.student?.email}
                </p>

                {/* Score */}

                <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Score</p>

                  <h3 className="mt-2 text-4xl font-bold">
                    {result.score}
                    <span className="text-lg font-medium text-gray-500">
                      /{result.answers?.length}
                    </span>
                  </h3>
                </div>

                {/* Footer */}

                <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Status: {result.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MCQResults;
