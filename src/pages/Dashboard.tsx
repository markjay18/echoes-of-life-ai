import { useEffect, useState } from "react";
import { fetchSymptoms, type Symptom } from "../fetch/medical";

const Dashboard = () => {
  const handleYesClick = () => {
    const speech = new SpeechSynthesisUtterance("Yes!");
    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleNoClick = () => {
    const speech = new SpeechSynthesisUtterance("No!");

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleMaybeClick = () => {
    const speech = new SpeechSynthesisUtterance("Maybe!");

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleThanksClick = () => {
    const speech = new SpeechSynthesisUtterance("Thank you!");

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleWelcomeClick = () => {
    const speech = new SpeechSynthesisUtterance("You're welcome!");

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const data = await fetchSymptoms();

        console.log("🔥 FETCHED:", data);

        setSymptoms(data);
      } catch (error) {
        console.error("❌ FETCH ERROR:", error);
      }
    };

    loadSymptoms();
  }, []);

  //speak it
  const handleSpeak = (description: string) => {
    if (!description) return;

    const speech = new SpeechSynthesisUtterance(description);
    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) =>
      /female|woman|zira|samantha|karen|victoria|ava|susan/i.test(voice.name),
    );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1.2;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const filteredSymptoms = symptoms.filter((symptom) => {
    const keywordQuery = searchQuery.trim().toLowerCase();

    if (!keywordQuery) return true;

    return symptom.keywords?.some((keyword: string) =>
      keyword.toLowerCase().includes(keywordQuery),
    );
  });

  const handleGenerate = async () => {
    const query = searchTerm.trim();

    if (!query) return;

    setLoading(true);

    // I-apply lang ang search kapag button is clicked
    setSearchQuery(query);

    setLoading(false);
  };

  return (
    // <div className="min-h-dvh flex flex-col bg-gray-100">
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Sidebar / Menu */}
      <div className="flex flex-1 min-h-0">
        <aside className="w-30 flex-shrink-0 bg-grey-600 shadow-md p-4">
          <div className="m-25" />

          <div className="flex items-center justify-center mb-10">
            <button
              type="button"
              onClick={handleYesClick}
              className="w-19 h-19 bg-white rounded-full
               cursor-pointer shadow-md hover:shadow-lg
               hover:scale-105 transition duration-200
               flex flex-col items-center justify-center
               text-green-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 10v10m0-10H4v10h3m0-10 3.5-7a2 2 0 0 1 2.9 1.8V7h4.6a2 2 0 0 1 2 2.4l-1.2 7A2 2 0 0 1 17.8 18H7"
                />
              </svg>

              {/* Divider */}
              <div className="w-8 border-t border-gray-300 my-1" />

              <span className="text-sm font-medium">Yes</span>
            </button>
          </div>

          <div className="flex items-center justify-center mb-10">
            <button
              type="button"
              onClick={handleNoClick}
              className="w-19 h-19 bg-white rounded-full
               cursor-pointer shadow-md hover:shadow-lg
               hover:scale-105 transition duration-200
               flex flex-col items-center justify-center
               text-red-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 14V4m0 10H4V4h3m0 10 3.5 7a2 2 0 0 0 2.9-1.8V17h4.6a2 2 0 0 0 2-2.4l-1.2-7A2 2 0 0 0 17.8 6H7"
                />
              </svg>

              {/* Divider */}
              <div className="w-8 border-t border-gray-300 my-1" />

              <span className="text-sm font-medium">No</span>
            </button>
          </div>

          <div className="flex items-center justify-center mb-10">
            <button
              type="button"
              onClick={handleMaybeClick}
              className="w-19 h-19 bg-white rounded-full
               cursor-pointer shadow-md hover:shadow-lg
               hover:scale-105 transition duration-200
               flex flex-col items-center justify-center
               text-yellow-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.5 9a2.5 2.5 0 1 1 4.8 1c-.5.9-1.8 1.3-2.3 2.2-.3.5-.4 1-.4 1.8M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                />
              </svg>

              {/* Divider */}
              <div className="w-8 border-t border-gray-300 my-1" />

              <span className="text-sm font-medium">Maybe</span>
            </button>
          </div>

          <div className="flex items-center justify-center mb-10">
            <button
              type="button"
              onClick={handleThanksClick}
              className="w-19 h-19 bg-white rounded-full
               cursor-pointer shadow-md hover:shadow-lg
               hover:scale-105 transition duration-200
               flex flex-col items-center justify-center
               text-blue-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 11V5a2 2 0 0 1 4 0v5m0-8v9m0-6a2 2 0 0 1 4 0v6m0-3a2 2 0 0 1 4 0v4c0 5-3 8-8 8h-1a7 7 0 0 1-7-7v-5a2 2 0 0 1 4 0v3"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m17 4 1-2m2 5 2-1M5 4 3 2"
                />
              </svg>

              {/* Divider */}
              <div className="w-8 border-t border-gray-300 my-1" />

              <span className="text-sm font-medium">Thank</span>
              <span className="text-sm font-medium">you</span>
            </button>
          </div>

          <div className="flex items-center justify-center mb-10">
            <button
              type="button"
              onClick={handleWelcomeClick}
              className="w-19 h-19 bg-white rounded-full
               cursor-pointer shadow-md hover:shadow-lg
               hover:scale-105 transition duration-200
               flex flex-col items-center justify-center
               text-orange-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 13V6a2 2 0 1 0-4 0v5m0-7a2 2 0 1 0-4 0v7m0-5a2 2 0 1 0-4 0v6m0-3a2 2 0 1 0-4 0v4c0 5 3.5 8 8 8h1c4.4 0 7-3.1 7-7v-5a2 2 0 1 0-4 0v2"
                />
              </svg>

              {/* Divider */}
              <div className="w-8 border-t border-gray-300 my-1" />

              <span className="text-sm font-medium">Welcome</span>
            </button>
          </div>

          {/* Menu */}
          {/* <nav className="space-y-3">
          <a
            href="#"
            className="block px-4 py-3 rounded-lg bg-blue-600 text-white font-medium"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Practice
          </a>

          <a
            href="#"
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Progress
          </a>

          <a
            href="#"
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Settings
          </a>
        </nav> */}
        </aside>

        {/* Main Body - ONLY THIS SCROLLS */}
        <main className="flex-1 min-w-0 overflow-y-auto mb-30">
          <div className="mb-8"></div>
          <div className="h-12"></div>
          {searchQuery && filteredSymptoms.length === 0 && (
            <div className="w-full bg-white p-8 text-center shadow-md">
              <p className="text-lg font-semibold text-gray-700">
                No results found
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Sorry. We couldn't find any prompt matching your search.
              </p>
            </div>
          )}
          {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 sm:gap-6 p-4 sm:p-6"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {symptom.iconUrl && (
                  <img
                    src={symptom.iconUrl}
                    alt={symptom.title ?? "Symptom"}
                    className="w-30 h-30 object-cover mx-auto"
                  />
                )}

                <div className="p-5">
                  <p className="text-[#C75C6F] mt-2">{symptom.title}</p>

                  <button
                    onClick={() =>
                      handleSpeak(symptom.description ?? "Symptom")
                    }
                    className="mt-4 px-4 py-3 w-full bg-[#FDE68A] text-gray-700 rounded-lg hover:bg-[#EAB308]"
                  >
                    Speak
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="ml-30 fixed bottom-0 left-2 right-0 p-2 bg-gray-100">
            <div className="shadow-md w-full md:w-[70%] lg:w-[50%] mx-auto rounded-[28px] border border-[#C75C6F] bg-neutral-secondary-medium p-2">
              <textarea
                id="prompt"
                value={searchTerm}
                rows={1}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  const textarea = e.target;

                  // Reset muna para malaman ang actual height ng content
                  textarea.style.height = "auto";

                  // Maximum height ng typing area
                  const maxHeight = 200;

                  // Grow hanggang 200px
                  if (textarea.scrollHeight <= maxHeight) {
                    textarea.style.height = `${textarea.scrollHeight}px`;
                    textarea.style.overflowY = "hidden";
                  } else {
                    textarea.style.height = `${maxHeight}px`;
                    textarea.style.overflowY = "auto";
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                className="
      block
      w-full
      min-h-[44px]
      max-h-[200px]
      resize-none
      overflow-hidden
      border-0
      bg-transparent
      px-2
      py-3
      text-heading
      leading-6
      outline-none
      placeholder:text-body
      focus:border-0
      focus:outline-none
      focus:ring-0
    "
                placeholder="What’s on your mind?"
                required
              />

              <div className="flex relative justify-end px-1 pt-1 pb-1">
                <p className="absolute left-1 mt-2 text-[#C75C6F]">
                  Hello there! 👋
                </p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || !searchTerm.trim()}
                  className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-[#C75C6F]
        text-white
        transition-opacity
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
                >
                  {loading ? (
                    <span className="text-xs">...</span>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19V5m0 0-6 6m6-6 6 6"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
