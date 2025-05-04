const generateMainStatComment = ({ core, build, companion }) => {
  if (!core || !build || !companion) return { msRating: '', comment: '' };

  if (core.mainstat === 'ATK' || core.mainstat === 'HP') {
    return { msRating: 'A', comment: '' };
  }
  if (
    (core.mainstat === 'Crit Rate' || core.mainstat === 'Crit DMG') &&
    (build === 'Crit Build' || build === 'Mix Build')
  ) {
    return { msRating: 'S', comment: 'crucial main stat for Crit Build' };
  }
  if (
    core.mainstat === 'DMG Boost to Weakened' &&
    (build === 'DMG to Weakened Build' || build === 'Mix Build')
  ) {
    return {
      msRating: 'S',
      comment: 'crucial main stat for DMG to Weakened Build',
    };
  }
  if (
    (core.mainstat === 'Crit Rate' || core.mainstat === 'Crit DMG') &&
    build === 'DMG to Weakened Build'
  ) {
    return {
      msRating: 'B',
      comment:
        'bad main stat for DMG to Weakened Build. Try rating this protocore with Crit Build',
    };
  }
  if (core.mainstat === 'DMG Boost to Weakened' && build === 'Crit Build') {
    return {
      msRating: 'B',
      comment:
        'bad main stat for Crit Build. Try rating this protocore with DMG to Weakened Build',
    };
  }
  if (core.mainstat === 'Oath Recovery Boost') {
    return {
      msRating: 'S',
      comment:
        'crucial main stat for faster Ardent Oath regeneration, especially when Solar Pair is R0,',
    };
  }
  if (core.mainstat === 'Expedited Energy Boost') {
    return {
      msRating: 'S',
      comment: 'good main stat for faster skill point regeneration',
    };
  }
  if (
    core.mainstat === "Oath's Strength" &&
    companion.companion === 'Ultimate Weapon X-02'
  ) {
    return {
      msRating: 'S',
      comment:
        'good main stat for Ultimate Weapon X-02 as a large part of the total damage comes from Ardent Oath',
    };
  }
  if (
    core.mainstat === "Oath's Strength" &&
    companion.companion !== 'Ultimate Weapon X-02'
  ) {
    return {
      msRating: 'S',
      comment: 'good main stat for more Oath damage',
    };
  }
  if (
    core.mainstat === 'DEF Bonus' &&
    companion.companion === 'Farspace Colonel'
  ) {
    return {
      msRating: 'S',
      comment:
        'If this is a Beta (cube) protocore, it has good main stat for Farspace Colonel, especially if Solar Pair is high ranked. If this is not a Beta (cube) protocore, the main stat is bad.',
    };
  }
  return {
    msRating: 'B',
    comment: `bad main stat${core.level < 15 ? ', do not level this piece' : ''}`,
  };
};

const generateRecommendation = ({
  core,
  msRating,
  rvRating,
  companion,
  comment,
}) => {
  if (!core || !msRating || !rvRating) return '-';
  if (msRating === 'B') {
    return `This protocore has a ${comment}.`;
  }
  if (msRating === 'A' && rvRating === 'S') {
    return `Very good protocore ${core.level < 15 ? 'to level' : ''}.`;
  }
  if (msRating === 'A' && rvRating === 'A') {
    return `Good protocore ${core.level < 15 ? 'to level' : ''}.`;
  }
  if (msRating === 'A' && rvRating === 'B') {
    return `${core.level < 15 ? 'Only level this protocore if really necessary.' : 'Not a very good protocore.'}`;
  }
  if (msRating === 'A' && rvRating === 'C') {
    return `Bad protocore${core.level < 15 ? ', do not level this piece' : ''}.`;
  }
  if (
    msRating === 'S' &&
    rvRating === 'S' &&
    companion.companion === 'Farspace Colonel' &&
    core.mainstat === 'DEF Bonus'
  ) {
    return `${comment} The substats are very good. ${core.level < 15 ? 'Highly recommended to level this if it is a Beta (cube) protocore, otherwise, not recommended.' : ''}`;
  }
  if (msRating === 'S' && rvRating === 'S') {
    return `This protocore has a ${comment} and the substats are very good. ${core.level < 15 ? 'Highly recommended to level this protocore.' : ''}`;
  }
  if (
    msRating === 'S' &&
    rvRating === 'A' &&
    companion.companion === 'Farspace Colonel' &&
    core.mainstat === 'DEF Bonus'
  ) {
    return `${comment} The substats are good. ${core.level < 15 ? 'It is worth leveling if it is a Beta (cube) protocore, otherwise, not recommended.' : ''}`;
  }
  if (msRating === 'S' && rvRating === 'A') {
    return `This protocore has a ${comment} and the substats are good. ${core.level < 15 ? 'It is worth leveling.' : ''}`;
  }
  if (
    msRating === 'S' &&
    rvRating === 'B' &&
    companion.companion === 'Farspace Colonel' &&
    core.mainstat === 'DEF Bonus'
  ) {
    return `${comment} The substats are not very good. ${core.level < 15 ? 'Level this protocore only if really necessary and only if this is a Beta (cube) protocore, otherwise, not recommended.' : ''}`;
  }
  if (msRating === 'S' && rvRating === 'B') {
    return `This protocore has a ${comment} but the substats are not very good. ${core.level < 15 ? 'Level this protocore only if really necessary.' : ''}`;
  }
  if (
    msRating === 'S' &&
    rvRating === 'C' &&
    companion.companion === 'Farspace Colonel' &&
    core.mainstat === 'DEF Bonus'
  ) {
    return `${comment} The substats are very bad. ${core.level < 15 ? 'Not recommended to level this protocore at all.' : ''}`;
  }
  if (msRating === 'S' && rvRating === 'C') {
    return `This protocore has a ${comment} but the substats are very bad. ${core.level < 15 ? 'Not recommended to level this protocore at all.' : ''}`;
  }
  return '';
};

const useGenerateRecommendation = (core, build, companion, results) => {
  const { msRating, comment } = generateMainStatComment({
    core,
    build,
    companion,
  });
  const recommendation = generateRecommendation({
    core,
    msRating,
    rvRating: results?.rvRating,
    companion,
    comment,
  });
  return { msRating, recommendation };
};

export default useGenerateRecommendation;
