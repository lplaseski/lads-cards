'use client';
import React, { useEffect, useState } from 'react';
import { companionList, stellactrumList } from '../constants';
import Result from './Result';
import useCalculateRv from '../hooks/useCalculateRv';
import { Build, Companion, Core, Stellactrum } from '../types';
import CoreOverview from './Core';

interface RaterProps {
  data: Core[];
}

const Rater = ({ data }: RaterProps) => {
  const [companion, setCompanion] = useState<
    Companion | { companion: ''; scaling: '' }
  >({
    companion: '',
    scaling: '',
  });
  const [stella, setStella] = useState<Stellactrum | ''>('');
  const [accent, setAccent] = useState('default');
  const [results, setResults] = useState<Core[]>([]);

  useEffect(() => {
    const listener = document.addEventListener('scroll' , () => {
      const header = document.querySelector('.sticky');
      if (header) {
        const scrollTop = window.scrollY;
        if (scrollTop > 90 && !header.classList.contains('shadow-md')) {
          header.classList.add('shadow-md');
        } else if (scrollTop <= 90 && header.classList.contains('shadow-md')) {
          header.classList.remove('shadow-md');
        }
      }
    })

    return () => {
      document.removeEventListener('scroll', listener);
    };
  })
  const calculateRv = useCalculateRv(companion);

  const selectCompanion = (companion: string) => {
    const selectedCompanion = companionList.find(
      (option) => option.companion === companion
    );

    if (!selectedCompanion) return;

    setCompanion(selectedCompanion);

    switch (selectedCompanion.companion) {
      case 'Lightseeker':
      case 'Lumiere':
        setAccent('xavier');
        break;
      case 'Foreseer':
      case 'Master of Fate':
        setAccent('zayne');
        break;
      case 'Abysswalker':
      case 'God of the Tides':
        setAccent('rafayel');
        break;
      case 'Relentless Conqueror':
      case 'Abysm Sovereign':
        setAccent('sylus');
        break;
      case 'Farspace Colonel':
      case 'Ultimate Weapon X-02':
        setAccent('caleb');
        break;
      default:
        setAccent('default');
        break;
    }
  };

  const handleRate = () => {
    const ratedCores = data.reduce((list, core) => {
      if (!core.mainstat || !core.stellactrum) return list;
      if (stella && core.stellactrum !== stella) return list;
      const critBuild = calculateRv(core, 'Crit Build');
      const dmgToWeakenedBuild = calculateRv(core, 'DMG to Weakened Build');
      const mixBuild = calculateRv(core, 'Mix Build');

      return [
        ...list,
        {
          ...core,
          critBuild,
          dmgToWeakenedBuild,
          mixBuild,
        },
      ];
    }, [] as Core[]);
    setResults(ratedCores);
  };

  const handleStellaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target?.value as Stellactrum;

    setStella(value || '');
  };

  return (
    <div>
      <div className='page'>
        <div className='general-info'>
          <div className='rater-form'>
            <div className='form-row'>
              <select
                onChange={(e) => selectCompanion(e.target.value)}
                value={companion.companion}
              >
                {companionList.map((option) => (
                  <option
                    key={option.companion}
                    className={`dropdown-item ${accent}-bg-color-hover`}
                    value={option.companion}
                  >
                    {option.companion}
                  </option>
                ))}
              </select>
              <select onChange={handleStellaChange} value={stella}>
              <option
                  className={`dropdown-item ${accent}-bg-color-hover`}
                  value=''
                >All</option>
                {stellactrumList.map((option) => (
                  <option
                    key={option}
                    className={`dropdown-item ${accent}-bg-color-hover`}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className={`${accent}-bg-color calculate-button`}
                onClick={handleRate}
              >
                Rate Protocores
              </button>
            </div>
          </div>
        </div>
        
          {!!results.length ? (
            <>
            <div className={`sticky text-center font-bold text-lg z-50 top-0 mb-[-1px] grid grid-cols-[300px_1fr_1fr_1fr] gap-4 p-4 ${accent}-bg-color`}>
            <p>Protocore</p>
            <p>Damage to Weakend Build</p>
            <p>Crit Build</p>
            <p>Mixed Build</p>
            </div>
        <div className={`grid grid-cols-[300px_1fr_1fr_1fr] gap-4 p-4 ${accent}-bg-color`}>
            {results.map((core, i) => (
              <>
                <CoreOverview
                  item={{
                    core: core,
                    companion: companion.companion,
                    accent: accent,
                  }}
                  isDetailed={false}
                />
                  <Result
                    key={`result-dmg-${i}`}
                    core={core}
                    companion={companion}
                    build={'DMG to Weakened Build'}
                    results={core.dmgToWeakenedBuild}
                  />
                  <Result
                    key={`result-crit-${i}`}
                    core={core}
                    companion={companion}
                    build={'Crit Build'}
                    results={core.critBuild}
                  />
                  <Result
                    key={`result-mix-${i}`}
                    core={core}
                    companion={companion}
                    build={'Mix Build'}
                    results={core.mixBuild}
                  />
                  </>
            ))}
            </div>
            </>
          ) : (
            <div>
              <p
                className={`rater-info-header ${accent}-bg-color ${accent}-color`}
              >
                PROTOCORE RATER
              </p>
              <p className='rater-info-body'>
                Enter protocore details and click '<b>Rate Protocore</b>'.
              </p>
              <p className='rater-info-body'>
                The result is only applicable for the chosen build and
                companion. A different build or companion might result in
                different rating.
              </p>
              <p className='rater-info-body'>
                This rater is only for rating SSR (gold) protocores. Lower
                rarity protocores are not worth leveling at all.
              </p>
              <br />
              <p
                className={`rater-info-header ${accent}-bg-color ${accent}-color`}
              >
                Which build to choose?
              </p>
              <p className='rater-info-body'>
                <b>Crit Build</b> is recommended when fighting without matching
                Stellactrum colors, fighting shielded enemies or enemies without
                protocore shields.
              </p>
              <p className='rater-info-body'>
                <b>DMG to Weakened Build</b> is recommended when fighting with
                all matching Stellactrum colors as enemies will often be in
                weakened state.
              </p>
              <br />
              <p
                className={`rater-info-header ${accent}-bg-color ${accent}-color`}
              >
                Core Level
              </p>
              <p className='rater-info-body'>
                Since a substat get added or upgraded every three levels, only
                every third level is available as an option.
              </p>
              <p className='rater-info-body'>
                For each three level upgrades, it is best to rate the protocore
                again as the rating may change.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Rater;
