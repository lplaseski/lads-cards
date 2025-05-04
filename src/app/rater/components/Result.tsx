import useGenerateRecommendation from '../hooks/useGenerateRecommendation';

const RATING_COLORS = {
  S: 'bg-green-300',
  A: 'bg-amber-300',
  B: 'bg-red-300',
} as const;

const RATING_BORDERS = {
  S: 'border-green-500',
  A: 'border-amber-400',
  B: 'border-red-400',
}

const Result = ({ core, build, results, companion }) => {
  const { level } = core;
  const { totalRV, substat1, substat2, substat3, substat4, rvRating } =
    results || {};

  const percentage = Math.min((totalRV / ((4 + level / 3) * 100)) * 100, 100);
  const { msRating, recommendation } = useGenerateRecommendation(
    core,
    build,
    companion,
    results
  );

  const isTrash = msRating === 'B' || (msRating === 'A' && rvRating === 'C');
  const isNotGood = rvRating === 'C' && msRating === 'S';

  const scalingBonus = `${companion.scaling} Bonus`;
  return (
    <div className='result-div' data-trash={isTrash} data-not-good={isNotGood}>
      <div className='result-item'>
        <div className='analysis-div'>
          <div className='core-analysis'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex items-center h-fit gap-4 border-1 rounded-md border-white bg-neutral-500 p-2 '>
                <p className="text-white h-fit">Main Stat: </p>
                <div className={`py-1 px-2 h-fit rounded-md text-sm font-semibold border-2 ${RATING_BORDERS[msRating as keyof typeof RATING_COLORS]} ${RATING_COLORS[msRating as keyof typeof RATING_COLORS]}`}>
                  {msRating === 'S' ? 'Good' : msRating === 'A' ? '--' : 'Bad'}
                </div>
              </div>
              <div className='flex flex-col h-fit gap-2 border-1 rounded-md border-white bg-neutral-500 p-2 col-start-1 col-end-2 row-start-2 row-end-3'>
                <p className="text-white text-sm">Has Companion Scaling</p>
                <p className="text-white text-lg font-bold">
                  {substat1.attribute === scalingBonus ||
                  substat2.attribute === scalingBonus ||
                  substat3.attribute === scalingBonus ||
                  substat4.attribute === scalingBonus
                    ? scalingBonus
                    : '--'}
                </p>
              </div>
              <div className='value-div progress-div col-start-1 col-end-2 row-start-3 row-end-4'>
          <div
            className={`progress-wrapper analysis-box border-1 ${rvRating}-core-bg-border`}
          >
            <div className='flex justify-between items-center'>
              <p className="text-white mb-1 text-sm">Substat Score</p>
              <p className='progress-label'>Max: {(4 + level / 3) * 100}%</p>
            </div>
            <div className='progress-padding'>
              <div className='progress-container'>
                <div
                  className='progress-bar'
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className='progress-info'>
                <div
                  className='progress-percentage'
                  style={{
                    left: `${percentage}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {totalRV}%
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className='border-1 rounded-md border-white bg-neutral-500 p-2 col-start-2 col-end-3 row-start-1 row-end-4'>
              <div className='grid-container'>
                <p className={`grid-item ${substat1.ssRating}-opacity`}>
                  {substat1.attribute}
                </p>
                <div
                  className={`grid-item substat-count ${substat1.ssRating}-opacity`}
                >
                  {Array.from({ length: substat1.rcount }, () => (
                    <div className='roll-count' />
                  ))}
                </div>
                <p className={`grid-item ${substat1.ssRating}-opacity`}>
                  {Math.round(substat1.rv)}%
                </p>
                <p className={`grid-item ${substat2.ssRating}-opacity`}>
                  {substat2.attribute}
                </p>
                <div
                  className={`grid-item substat-count ${substat2.ssRating}-opacity`}
                >
                  {Array.from({ length: substat2.rcount }, () => (
                    <div className='roll-count' />
                  ))}
                </div>
                <p className={`grid-item ${substat2.ssRating}-opacity`}>
                  {Math.round(substat2.rv)}%
                </p>
                {!!substat3.attribute && (
                  <>
                    <p className={`grid-item ${substat3.ssRating}-opacity`}>
                      {substat3.attribute}
                    </p>
                    <div
                      className={`grid-item substat-count ${substat3.ssRating}-opacity`}
                    >
                      {Array.from({ length: substat3.rcount }, () => (
                        <div className='roll-count' />
                      ))}
                    </div>
                    <p className={`grid-item ${substat3.ssRating}-opacity`}>
                      {Math.round(substat3.rv)}%
                    </p>
                  </>
                )}
                {!!substat4.attribute && (
                  <>
                    <p className={`grid-item ${substat4.ssRating}-opacity`}>
                      {substat4.attribute}
                    </p>
                    <div
                      className={`grid-item substat-count ${substat4.ssRating}-opacity`}
                    >
                      {Array.from({ length: substat4.rcount }, () => (
                        <div className='roll-count' />
                      ))}
                    </div>
                    <p className={`grid-item ${substat4.ssRating}-opacity`}>
                      {Math.round(substat4.rv)}%
                    </p>
                  </>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className='value-div comment-div'>
          <div className='analysis-box comment-analysis'>
            <p className="text-white mb-1 text-sm">Recommendation</p>
            <p>{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
