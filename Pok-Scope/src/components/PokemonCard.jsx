import "./PokemonCard.css";
import TypeBackgrounds from '/src/utils/TypeBackgrounds';
import TypeFonts from '/src/utils/TypeFonts';
import TypeColors from '/src/utils/TypeColors';

function PokemonCard({ name, img, types, abilities }) {
  return (
    <div className={`${TypeBackgrounds.cards.white} ${TypeBackgrounds.cards.rounded} ${TypeBackgrounds.cards.shadow} ${TypeBackgrounds.cards.padding} ${TypeBackgrounds.cards.spaceY} text-center`}>
      <h2 className={`${TypeFonts.heading} ${TypeColors.text.gray800}`}>{name}</h2>
      {img && <img src={img} alt={name} className="w-32 h-32 mx-auto" />}
      
      <div>
        <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>Type:</h3>
        <div className={TypeBackgrounds.flexCenter}>
          {types.map((type) => (
            <span key={type} className={TypeBackgrounds.typeBadge}>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className={`${TypeFonts.subheading} ${TypeColors.text.gray700}`}>Abilities:</h3>
        <div className={TypeBackgrounds.flexCenter}>
          {abilities.map((ability) => (
            <span key={ability} className={TypeBackgrounds.abilityBadge}>
              {ability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;