import { useCallback } from 'react';
import { substatList } from '../constants';

const useCalculateRv = (companion) => {
  const assessSubstat = useCallback(
    (substat, build) => {
      if (
        (companion.scaling === 'ATK' && substat.attribute === 'ATK Bonus') ||
        (companion.scaling === 'DEF' &&
          (substat.attribute === 'DEF Bonus' ||
            substat.attribute === 'ATK Bonus')) ||
        (companion.scaling === 'HP' &&
          (substat.attribute === 'HP Bonus' ||
            substat.attribute === 'ATK Bonus')) ||
        ((build === 'Crit Build' || build === 'Mix Build') &&
          (substat.attribute === 'Crit Rate' ||
            substat.attribute === 'Crit DMG')) ||
        ((build === 'DMG to Weakened Build' || build === 'Mix Build') &&
          substat.attribute === 'DMG Boost to Weakened') ||
        (companion.companion === 'Ultimate Weapon X-02' &&
          substat.attribute === "Oath's Strength")
      ) {
        return 'S';
      } else if (
        (companion.scaling === 'ATK' && substat.attribute === 'ATK') ||
        (companion.scaling === 'DEF' &&
          (substat.attribute === 'DEF' || substat.attribute === 'ATK')) ||
        (companion.scaling === 'HP' &&
          (substat.attribute === 'HP' || substat.attribute === 'ATK')) ||
        (companion.companion !== 'Ultimate Weapon X-02' &&
          substat.attribute === "Oath's Strength")
      ) {
        return 'A';
      } else if (!substat.attribute) {
        return 'none';
      } else {
        return 'B';
      }
    },
    [companion]
  );

  const calculateRV = useCallback(
    (substat, level, build) => {
      const attribute = substatList.find(
        (option) => option.attribute === (substat.attribute || '')
      );
      const assessedSubstat = assessSubstat(substat, build);

      if (attribute) {
        if (
          substat.value < attribute.minimum ||
          substat.value >
            attribute.initial + attribute.increment * (level / 3 + 2)
        ) {
          return [0, 'value', 0, 'none', attribute.minimum];
        } else {
          const removeMaxInitial = Number(
            (substat.value - attribute.initial).toFixed(2)
          );
          const moreThanMaxInitial = removeMaxInitial >= 0 ? 1 : 0;
          const numberOfRolls = Math.floor(
            (removeMaxInitial * moreThanMaxInitial) / attribute.increment
          );
          const lastRollValue = removeMaxInitial % attribute.increment;
          const incrementValueTotal = numberOfRolls * attribute.increment;
          const notFullInitial = moreThanMaxInitial
            ? 0
            : (substat.value / attribute.initial) * 100;
          const totalRV =
            moreThanMaxInitial * 100 +
            ((incrementValueTotal + moreThanMaxInitial * lastRollValue) /
              attribute.increment) *
              100 +
            notFullInitial;
          let totalRollCount = 1;
          if (numberOfRolls > 0) {
            totalRollCount = totalRollCount + numberOfRolls;
          }
          if (lastRollValue > 0) {
            totalRollCount = totalRollCount + 1;
          }
          if (assessedSubstat === 'S') {
            return [
              totalRV,
              '',
              totalRollCount,
              assessedSubstat,
              attribute.minimum,
            ];
          } else if (assessedSubstat === 'A') {
            return [
              totalRV * 0.4,
              '',
              totalRollCount,
              assessedSubstat,
              attribute.minimum,
            ];
          } else if (assessedSubstat === 'none') {
            return [0, '', 0, assessedSubstat, attribute.minimum];
          } else {
            return [0, '', totalRollCount, assessedSubstat, attribute.minimum];
          }
        }
      }
      return [0, 'attribute', 0, 'none', 0];
    },
    [assessSubstat]
  );

  const rateCore = useCallback(
    (coreObj, build) => {
      const [substat1RV, error1, numberofRoll1, assessedSubstat1, attribute1] =
        calculateRV(coreObj.substat1, coreObj.level, build) as [
          number,
          string,
          number,
          string,
          number,
        ];
      const [substat2RV, error2, numberofRoll2, assessedSubstat2, attribute2] =
        calculateRV(coreObj.substat2, coreObj.level, build) as [
          number,
          string,
          number,
          string,
          number,
        ];
      const [substat3RV, error3, numberofRoll3, assessedSubstat3, attribute3] =
        calculateRV(coreObj.substat3, coreObj.level, build) as [
          number,
          string,
          number,
          string,
          number,
        ];
      const [substat4RV, error4, numberofRoll4, assessedSubstat4, attribute4] =
        calculateRV(coreObj.substat4, coreObj.level, build) as [
          number,
          string,
          number,
          string,
          number,
        ];
      const rollCount =
        numberofRoll1 + numberofRoll2 + numberofRoll3 + numberofRoll4;
      const requiredRollCount =
        coreObj.level >= 6
          ? 4 + coreObj.level / 3 - 3
          : 4 + coreObj.level / 3 - 2;
      const maxRollCount = 4 + coreObj.level / 3;
      let errorFromRollCount = '';

      if (rollCount < 4) {
        const numberOfDouble =
          !coreObj.substat3.value && !coreObj.substat4.value
            ? rollCount === 2
              ? 2
              : coreObj.level / 3
            : coreObj.level / 3 + 1;
        const numberOfTriple =
          !coreObj.substat3.value && !coreObj.substat4.value && rollCount !== 2
            ? 1
            : 0;
        let countDouble = 0;
        let countTriple = 0;
        let checkedSub1 = false;
        let checkedSub2 = false;
        let checkedSub3 = false;
        let checkedSub4 = false;
        while (
          countDouble !== numberOfDouble ||
          countTriple !== numberOfTriple
        ) {
          if (
            !checkedSub1 &&
            numberOfDouble &&
            coreObj.substat1.value ===
              Number((attribute1 / 2 + attribute1).toFixed(2))
          ) {
            countDouble += 1;
            checkedSub1 = true;
            continue;
          }
          if (
            !checkedSub1 &&
            numberOfTriple &&
            coreObj.substat1.value >= Number((attribute1 * 2).toFixed(2))
          ) {
            countTriple += 1;
            checkedSub1 = true;
            continue;
          }
          if (
            !checkedSub2 &&
            numberOfDouble &&
            coreObj.substat2.value ===
              Number((attribute2 / 2 + attribute2).toFixed(2))
          ) {
            countDouble += 1;
            checkedSub2 = true;
            continue;
          }
          if (
            !checkedSub2 &&
            numberOfTriple &&
            coreObj.substat2.value >= Number((attribute2 * 2).toFixed(2))
          ) {
            countTriple += 1;
            checkedSub2 = true;
            continue;
          }
          if (
            !checkedSub3 &&
            coreObj.substat3.value &&
            numberOfDouble &&
            coreObj.substat3.value ===
              Number((attribute3 / 2 + attribute3).toFixed(2))
          ) {
            countDouble += 1;
            checkedSub3 = true;
            continue;
          }
          if (
            !checkedSub3 &&
            coreObj.substat3.value &&
            numberOfTriple &&
            coreObj.substat3.value >= Number((attribute3 * 2).toFixed(2))
          ) {
            countTriple += 1;
            checkedSub3 = true;
            continue;
          }
          if (
            !checkedSub4 &&
            coreObj.substat4.value &&
            numberOfDouble &&
            coreObj.substat4.value ===
              Number((attribute4 / 2 + attribute4).toFixed(2))
          ) {
            countDouble += 1;
            checkedSub4 = true;
            continue;
          }
          if (
            !checkedSub4 &&
            coreObj.substat4.value &&
            numberOfTriple &&
            coreObj.substat4.value >= Number((attribute4 * 2).toFixed(2))
          ) {
            countTriple += 1;
            checkedSub4 = true;
            continue;
          }
          break;
        }
        if (countDouble < numberOfDouble) {
          errorFromRollCount = 'value';
        }
        if (countTriple < numberOfTriple) {
          errorFromRollCount = 'value';
        }
      }

      if (
        error1 === 'value' ||
        error2 === 'value' ||
        error3 === 'value' ||
        error4 === 'value' ||
        errorFromRollCount === 'value'
      ) {
        return coreObj;
      } else if (
        error1 === 'attribute' ||
        error2 === 'attribute' ||
        error3 === 'attribute' ||
        error4 === 'attribute'
      ) {
        return coreObj;
      } else if (rollCount < requiredRollCount) {
        return coreObj;
      } else if (rollCount > maxRollCount) {
        return coreObj;
      } else {
        const totalRV = Math.round(
          substat1RV + substat2RV + substat3RV + substat4RV
        );
        const rvRating =
          totalRV < ((4 + coreObj.level / 3) * 100) / 4
            ? 'C'
            : totalRV < ((4 + coreObj.level / 3) * 100) / 2
              ? 'B'
              : totalRV < (((4 + coreObj.level / 3) * 100) / 4) * 3
                ? 'A'
                : 'S';

        return {
          totalRV: totalRV,
          rvRating: rvRating,
          substat1: {
            ...coreObj.substat1,
            rv: substat1RV,
            rcount: numberofRoll1,
            ssRating: assessedSubstat1,
          },
          substat2: {
            ...coreObj.substat2,
            rv: substat2RV,
            rcount: numberofRoll2,
            ssRating: assessedSubstat2,
          },
          substat3: {
            ...coreObj.substat3,
            rv: substat3RV,
            rcount: numberofRoll3,
            ssRating: assessedSubstat3,
          },
          substat4: {
            ...coreObj.substat4,
            rv: substat4RV,
            rcount: numberofRoll4,
            ssRating: assessedSubstat4,
          },
        };
      }
    },
    [calculateRV]
  );

  return rateCore;
};

export default useCalculateRv;
