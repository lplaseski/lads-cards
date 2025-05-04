import { mainstatList } from '../constants';

const Core = ({ item, styling, isDetailed }) => {
  return (
    <div className={`${styling} display-core w-75 shrink-0`}>
      <div className='core-info'>
        <div className='core-header'>
          <div className='core-type'>
            <p className={`${item.core.stellactrum}-color stellactrum-circle`}>
              &#11044;
            </p>
            <p className='type-name'>{item.core.stellactrum} Protocore - {item.core.type}</p>
          </div>
          <div className='level-div'>
            <p className='core-level'>+{item.core.level}</p>
          </div>
        </div>
        {isDetailed && (
          <div className='core-tags'>
            <div>
              <p
                className={`${item.accent}-bg-color ${item.accent}-color tag-style`}
              >
                {item.companion}
              </p>
            </div>
            <div>
              <p className='tag-style'>{item.build}</p>
            </div>
          </div>
        )}
        <div className='core-mainstat'>
          <p className='stat-attribute'>{item.core.mainstat}</p>
          <p className='stat-value'>
            +
            {(() => {
              const mainstat = mainstatList.find(
                (option) => option.attribute === item.core.mainstat
              );
              return mainstat
                ? parseFloat(
                    (
                      mainstat.increment * item.core.level +
                      mainstat.initial
                    ).toFixed(1)
                  )
                : '';
            })()}
            {item.core.mainstat === 'HP' || item.core.mainstat === 'ATK'
              ? ''
              : '%'}
          </p>
        </div>
        <div
          className={`core-substat ${item.core.substat1.ssRating === 'S' ? 'good-substat' : ''}`}
        >
          <p className='stat-attribute'>{item.core.substat1.attribute}</p>
          <p className='stat-value'>
            +{item.core.substat1.value}
            {item.core.substat1.attribute === 'HP' ||
            item.core.substat1.attribute === 'ATK' ||
            item.core.substat1.attribute === 'DEF'
              ? ''
              : '%'}
          </p>
        </div>
        <div
          className={`core-substat ${item.core.substat2.ssRating === 'S' ? 'good-substat' : ''}`}
        >
          <p className='stat-attribute'>{item.core.substat2.attribute}</p>
          <p className='stat-value'>
            +{item.core.substat2.value}
            {item.core.substat2.attribute === 'HP' ||
            item.core.substat2.attribute === 'ATK' ||
            item.core.substat2.attribute === 'DEF'
              ? ''
              : '%'}
          </p>
        </div>
        {!!item.core.substat3.attribute && (
          <div
            className={`core-substat ${item.core.substat3.ssRating === 'S' ? 'good-substat' : ''}`}
          >
            <p className='stat-attribute'>{item.core.substat3.attribute}</p>
            <p className='stat-value'>
              +{item.core.substat3.value}
              {item.core.substat3.attribute === 'HP' ||
              item.core.substat3.attribute === 'ATK' ||
              item.core.substat3.attribute === 'DEF'
                ? ''
                : '%'}
            </p>
          </div>
        )}
        {!!item.core.substat4.attribute && (
          <div
            className={`core-substat ${item.core.substat4.ssRating === 'S' ? 'good-substat' : ''}`}
          >
            <p className='stat-attribute'>{item.core.substat4.attribute}</p>
            <p className='stat-value'>
              +{item.core.substat4.value}
              {item.core.substat4.attribute === 'HP' ||
              item.core.substat4.attribute === 'ATK' ||
              item.core.substat4.attribute === 'DEF'
                ? ''
                : '%'}
            </p>
          </div>
        )}
      </div>
      {isDetailed && (
        <div>
          <p className={`${item.core.rvRating}-core-bg core-rating`}>
            {item.core.totalRV}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Core;
