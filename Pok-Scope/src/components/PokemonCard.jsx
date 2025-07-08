import PokemonRadarChart from "./PokemonRadarChart";
import TypeBackgrounds from "/src/utils/TypeBackgrounds";
import TypeFonts from "/src/utils/TypeFonts";
import TypeColors from "/src/utils/TypeColors";
import "./PokemonCard.css";

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
      className={`${TypeBackgrounds.cards.white} ${TypeBackgrounds.cards.rounded} ${TypeBackgrounds.cards.shadow} ${TypeBackgrounds.cards.padding} ${TypeBackgrounds.cards.spaceY} text-center`}
    >
      <h2 className={`${TypeFonts.heading} ${TypeColors.text.gray800}`}>
        {name}
      </h2>
      {img && <img src={img} alt={name} className="w-32 h-32 mx-auto" />}

      {/* Type */}
      <div>
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

      {/* Abilities */}
      <div>
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

      {/* Weaknesses, Resistances, Immunities */}
      <div>
        <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
          Type Matchups:
        </h3>
        <div className={TypeBackgrounds.flexCenter}>
          <div>
            <h4 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>Weak To:</h4>
            {weaknesses.length > 0 ? (
              weaknesses.map((type) => (
                <span key={type.name} className={TypeBackgrounds.weaknessBadge}>
                  {type.name}
                </span>
              ))
            ) : (
              <span className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>None</span>
            )}
          </div>
          <div>
            <h4 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>Resists To:</h4>
            {resistances.length > 0 ? (
              resistances.map((type) => (
                <span
                  key={type.name}
                  className={TypeBackgrounds.resistanceBadge}
                >
                  {type.name}
                </span>
              ))
            ) : (
              <span className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>None</span>
            )}
          </div>
          <div>
            <h4 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>Immune To:</h4>
            {immunities.length > 0 ? (
              immunities.map((type) => (
                <span key={type.name} className={TypeBackgrounds.typeBadge}>
                  {type.name}
                </span>
              ))
            ) : (
              <span className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>None</span>
            )}
          </div>
        </div>
      </div>

      {/* Base Stats */}
      <div>
        <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>
          Base Stats:
        </h3>
        <div className={`${TypeBackgrounds.statsBadge}`}>
          {Array.isArray(Stats) && Stats.length > 0 && (
            <PokemonRadarChart stats={Stats} pokemonName={name} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
