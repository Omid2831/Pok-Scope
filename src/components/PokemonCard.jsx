import PokemonRadarChart from "./PokemonRadarChart";
import TypeBackgrounds from "/src/utils/TypeBackgrounds";
import TypeFonts from "/src/utils/TypeFonts";
import TypeColors from "/src/utils/TypeColors";
import HoverActions from "./HoverActions";


function PokemonCard({
  name,
  img,
  types,
  abilities,
  Stats,
  weaknesses,
  resistances,
  immunities,
}) {
  return (
    <div
      className={`${TypeBackgrounds.cards.white} ${TypeBackgrounds.cards.rounded}
  ${TypeBackgrounds.cards.shadow} ${TypeBackgrounds.cards.padding} ${TypeBackgrounds.cards.spaceY} text-center relative`}
    >
      {/* Favorite Heart Button */}
      <div className="absolute top-2 right-2">
        <HoverActions
          name={name}
          onfavorite={() => console.log("Favorited", name)}
          onunfavorite={() => console.log("Unfavorited", name)}
        />
      </div>

      {/* Name */}
      <h2 className={`${TypeFonts.heading} ${TypeColors.text.gray800}`}>
        {name}
      </h2>

      {/* Grid: Image first on mobile, center on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Type */}
        <div className="order-2 sm:order-1">
          <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
            Type:
          </h3>
          <div className={TypeBackgrounds.flexCenter}>
            {types.map((type) => (
              <span key={type} className={TypeBackgrounds.typeBadge}>
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        {img && (
          <div className="order-1 sm:order-2">
            <img
              src={img}
              alt={name}
              className="w-32 h-32 mx-auto my-2 sm:my-0"
            />
          </div>
        )}

        {/* Abilities */}
        <div className="order-3 sm:order-3">
          <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
            Abilities:
          </h3>
          <div className={TypeBackgrounds.flexCenter}>
            {abilities.map((ability) => (
              <span key={ability} className={TypeBackgrounds.abilityBadge}>
                {ability}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-4">
        {/* Type Matchups */}
        <div>
          <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
            Type Matchups:
          </h3>
          <div className={TypeBackgrounds.flexCenter}>
            {/* Weak To */}
            <div>
              <h4
                className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
              >
                Weak To:
              </h4>
              {weaknesses.length > 0 ? (
                (() => {
                  const max = 7;
                  let displayWeaknesses = [...weaknesses];

                  while (displayWeaknesses.length >= max + 1) {
                    displayWeaknesses.shift();
                    if (displayWeaknesses.length > max) {
                      displayWeaknesses.pop();
                    }
                  }
                  return displayWeaknesses.map((type) => (
                    <span
                      key={type.name}
                      className={TypeBackgrounds.weaknessBadge}
                    >
                      {type.name}
                    </span>
                  ));
                })()
              ) : (
                <span
                  className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
                >
                  None
                </span>
              )}
            </div>

            {/* Resists To */}
            <div>
              <h4
                className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
              >
                Resists To:
              </h4>
              {resistances.length > 0 ? (
                (() => {
                  const max = 7;
                  let displayResistances = [...resistances];

                  while (displayResistances.length >= max + 1) {
                    displayResistances.shift();
                    if (displayResistances.length > max) {
                      displayResistances.pop();
                    }
                  }
                  return displayResistances.map((type) => (
                    <span
                      key={type.name}
                      className={TypeBackgrounds.resistanceBadge}
                    >
                      {type.name}
                    </span>
                  ));
                })()
              ) : (
                <span
                  className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
                >
                  None
                </span>
              )}
            </div>

            {/* Immune To */}
            <div>
              <h4
                className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
              >
                Immune To:
              </h4>
              {immunities.length > 0 ? (
                (() => {
                  const max = 7;
                  let displayImmunities = [...immunities];

                  while (displayImmunities.length >= max + 1) {
                    displayImmunities.shift();
                    if (displayImmunities.length > max) {
                      displayImmunities.pop();
                    }
                  }
                  return displayImmunities.map((type) => (
                    <span key={type.name} className={TypeBackgrounds.typeBadge}>
                      {type.name}
                    </span>
                  ));
                })()
              ) : (
                <span
                  className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}
                >
                  None
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Base Stats */}
        <div>
          <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
            Base Stats:
          </h3>
          <div className={TypeBackgrounds.statsBadge}>
            {Array.isArray(Stats) && Stats.length > 0 && (
              <PokemonRadarChart stats={Stats} pokemonName={name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
