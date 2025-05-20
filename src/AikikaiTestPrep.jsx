import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const AikikaiTestPrep = () => {
  // State for selected rank and technique confidence levels
  const [selectedRank, setSelectedRank] = useState("5th kyu");
  const [confidenceLevels, setConfidenceLevels] = useState({});
  const [reportMode, setReportMode] = useState(false);

  // Rank progression order (lowest to highest)
  const rankOrder = ["5th kyu", "4th kyu", "3rd kyu", "2nd kyu", "1st kyu", "Shodan"];

  // Column headers based on the PDF
  const attackTypes = [
    "Katate dori gyaku hanmi",
    "Katate dori ai hanmi",
    "Ryotedori",
    "Morotedori",
    "Katadori",
    "Shomenuchi",
    "Yokomenuchi",
    "Tsuki",
    "Ushiro ryotedori",
    "Ushiro ryokatadori",
    "Ushiro kubishime"
  ];

  // Data restructured to match the PDF layout
  const testRequirements = {
    "5th kyu": {
      "Katate dori gyaku hanmi": ["Ikkyo", "Shihonage", "Kaitennage (uchi & soto)"],
      "Katate dori ai hanmi": ["Ikkyo"],
      "Ryotedori": ["Suwari waza Kokyuho"],
      "Katadori": ["Ikkyo"],
      "Shomenuchi": ["Ikkyo"],
      "Morotedori": [],
      "Yokomenuchi": [],
      "Tsuki": [],
      "Ushiro ryotedori": [],
      "Ushiro ryokatadori": [],
      "Ushiro kubishime": []
    },
    "4th kyu": {
      "Katate dori gyaku hanmi": ["Iriminage", "Nikyo", "Sankyo", "Kotegaeshi", "Kokyunage"],
      "Katate dori ai hanmi": ["Iriminage", "Nikyo", "Sankyo", "Kotegaeshi", "Soto kaitennage", "Shihonage"],
      "Ryotedori": ["Shihonage", "Tenchinage", "Kokyunage", "Hanmi-handachi Shihonage"],
      "Morotedori": ["Kokyunage"],
      "Katadori": ["Nikyo", "Sankyo"],
      "Shomenuchi": ["Nikyo", "Sankyo"],
      "Yokomenuchi": ["Shihonage"],
      "Tsuki": [],
      "Ushiro ryotedori": [],
      "Ushiro ryokatadori": [],
      "Ushiro kubishime": []
    },
    "3rd kyu": {
      "Katate dori gyaku hanmi": ["Hanmi-handachi Shihonage", "Hanmi-handachi Kaitennage (uchi & soto)", "Hanmi-handachi Sumiotoshi", "Yonkyo", "Koshinage"],
      "Katate dori ai hanmi": ["Jujinage", "Yonkyo", "Sumiotoshi", "Koshinage"],
      "Ryotedori": ["Iriminage", "Kotegaeshi", "Koshinage"],
      "Morotedori": ["Ikkyo", "Nikyo", "Iriminage"],
      "Katadori": ["Yonkyo", "Shihonage", "Kotegaeshi"],
      "Shomenuchi": ["Yonkyo", "Iriminage", "Kotegaeshi"],
      "Yokomenuchi": ["Suwari waza Kokyunage", "Ikkyo", "Nikyo", "Sankyo", "Yonkyo", "Iriminage", "Kotegaeshi", "Jujinage"],
      "Tsuki": ["Ikkyo", "Nikyo", "Sankyo", "Kotegaeshi"],
      "Ushiro ryotedori": ["Kokyunage"],
      "Ushiro ryokatadori": [],
      "Ushiro kubishime": ["Kokyunage"]
    },
    "2nd kyu": {
      "Katate dori gyaku hanmi": ["Hanmi-handachi katagatame (uchi & soto)", "Hanmi-handachi Kokyunage"],
      "Katate dori ai hanmi": [],
      "Ryotedori": [],
      "Morotedori": ["Kotegaeshi", "Jujinage"],
      "Katadori": ["Katagatame (uchi & soto)"],
      "Shomenuchi": ["Sumiotoshi", "Gokyo", "Koshinage"],
      "Yokomenuchi": [],
      "Tsuki": ["Iriminage", "Sumiotoshi", "Gokyo", "Koshinage"],
      "Ushiro ryotedori": ["Ikkyo", "Nikyo", "Sankyo", "Yonkyo"],
      "Ushiro ryokatadori": ["Ikkyo", "Nikyo", "Sankyo", "Yonkyo", "Katate-eridori iriminage"],
      "Ushiro kubishime": []
    },
    "1st kyu": {
      "Katate dori gyaku hanmi": [],
      "Katate dori ai hanmi": [],
      "Ryotedori": [],
      "Morotedori": ["Udegarami", "Shihonage"],
      "Katadori": ["Rokyo", "Kokyunage"],
      "Shomenuchi": ["Hanmi-handachi iriminage", "Hanmi-handachi kotegaeshi"],
      "Yokomenuchi": ["Hanmi-handachi shihonage", "Hanmi-handachi kotegaeshi"],
      "Tsuki": [],
      "Ushiro ryotedori": ["Kaitennage", "Shihonage", "Kotegaeshi", "Iriminage", "Jujinage"],
      "Ushiro ryokatadori": [],
      "Ushiro kubishime": ["Udegarami"]
    },
    "Shodan": {
      "Katate dori gyaku hanmi": [],
      "Katate dori ai hanmi": [],
      "Ryotedori": ["Aikiotoshi"],
      "Morotedori": [],
      "Katadori": ["Katamenuchi ikkyo", "Katamenuchi nikyo", "Katamenuchi sankyo", "Katamenuchi yonkyo", "Katamenuchi iriminage", "Katamenuchi kotegaeshi"],
      "Shomenuchi": [],
      "Yokomenuchi": [],
      "Tsuki": ["Rokyo"],
      "Ushiro ryotedori": ["Koshinage"],
      "Ushiro ryokatadori": ["Hanmi-handachi ikkyo", "Hanmi-handachi nikyo", "Hanmi-handachi sankyo", "Hanmi-handachi yonkyo", "Hanmi-handachi kotegaeshi", "Hanmi-handachi shihonage"],
      "Ushiro kubishime": ["Ikkyo", "Nikyo", "Sankyo", "Kotegaeshi", "Tantodori", "Jodori", "Futaridori", "Sanningake", "Essay"]
    }
  };

  // Get all applicable ranks (current and previous)
  const getApplicableRanks = (rank) => {
    const idx = rankOrder.indexOf(rank);
    return idx === -1 ? [rank] : rankOrder.slice(0, idx + 1);
  };

  // Update confidence level
  const updateConfidence = (technique, attackType, rankOfTechnique, level) => {
    const key = `${rankOfTechnique}-${attackType}-${technique}`;
    setConfidenceLevels((prev) => ({ ...prev, [key]: level }));
  };

  // Retrieve confidence level
  const getConfidenceLevel = (technique, attackType, rankOfTechnique) => {
    const key = `${rankOfTechnique}-${attackType}-${technique}`;
    return confidenceLevels[key] || 0;
  };

  // Color helper
  const getColorClass = (lvl) =>
    lvl === 1 ? "bg-red-200" : lvl === 2 ? "bg-yellow-200" : lvl === 3 ? "bg-green-200" : "";

  // Build technique map for selected rank + predecessors
  const generateTechniqueList = () => {
    const result = {};
    attackTypes.forEach((t) => (result[t] = []));

    getApplicableRanks(selectedRank).forEach((rank) => {
      const rankTechniques = testRequirements[rank] || {};
      Object.keys(rankTechniques).forEach((attackType) => {
        rankTechniques[attackType].forEach((technique) => {
          result[attackType].push({ technique, rank, isCurrent: rank === selectedRank });
        });
      });
    });
    return result;
  };

  // Flatten list
  const getAllTechniques = () => {
    const map = generateTechniqueList();
    const flat = [];
    Object.keys(map).forEach((attackType) => {
      map[attackType].forEach((item) => flat.push({ ...item, attackType }));
    });
    return flat;
  };

  // Count by confidence level
  const countConfidence = (lvl) =>
    getAllTechniques().filter(({ technique, attackType, rank }) => getConfidenceLevel(technique, attackType, rank) === lvl).length;

  // Cached data for rendering
  const techniquesByAttackType = generateTechniqueList();
  const totalTechniques = getAllTechniques().length;

  // Toggle report view
  const toggleReportMode = () => {
    setReportMode(!reportMode);
  };

  const downloadPdf = () => {
    const element = document.querySelector('.report-view');
    if (!element) return;
    html2pdf(element, {
      margin: 10,
      filename: `Aikido_Report_${selectedRank}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
  };

  // Get techniques filtered by confidence level
  const getFilteredTechniques = (level) => {
    const map = generateTechniqueList();
    const result = {};
    
    attackTypes.forEach(attackType => {
      const techniques = map[attackType]
        .filter(item => getConfidenceLevel(item.technique, attackType, item.rank) === level);
      
      if (techniques.length > 0) {
        result[attackType] = techniques;
      }
    });
    
    return result;
  };

  // For report view
  const needWorkTechniques = getFilteredTechniques(1);
  const okTechniques = getFilteredTechniques(2);

  if (reportMode) {
    // Report View
    return (
      <div className="max-w-full mx-auto p-4">
        <div className="report-view bg-white p-6 max-w-5xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Lemon Hill Aikido Training Report - {selectedRank}</h1>
            <div className="flex gap-2">
              <button
                onClick={downloadPdf}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                Download PDF
              </button>
              <button
                onClick={toggleReportMode}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
              >
                Back to App
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-8">Generated on {new Date().toLocaleDateString()}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-red-200 p-2">Techniques That Need Work</h2>
            {Object.keys(needWorkTechniques).length === 0 ? (
              <p className="py-2">No techniques currently marked as "Need Work".</p>
            ) : (
              <table className="min-w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left border">Attack Type</th>
                    <th className="px-4 py-2 text-left border">Techniques</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(needWorkTechniques).map(attackType => (
                    <tr key={`need-work-${attackType}`} className="border">
                      <td className="px-4 py-3 border font-medium">{attackType}</td>
                      <td className="px-4 py-3 border">
                        {needWorkTechniques[attackType].map(item => (
                          <div key={`need-work-${attackType}-${item.technique}`} className="mb-1">
                            {item.technique} {item.isCurrent ? 
                              <span className="font-bold">(Current Rank)</span> : ""}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-yellow-200 p-2">Techniques That Are OK</h2>
            {Object.keys(okTechniques).length === 0 ? (
              <p className="py-2">No techniques currently marked as "OK".</p>
            ) : (
              <table className="min-w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left border">Attack Type</th>
                    <th className="px-4 py-2 text-left border">Techniques</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(okTechniques).map(attackType => (
                    <tr key={`ok-${attackType}`} className="border">
                      <td className="px-4 py-3 border font-medium">{attackType}</td>
                      <td className="px-4 py-3 border">
                        {okTechniques[attackType].map(item => (
                          <div key={`ok-${attackType}-${item.technique}`} className="mb-1">
                            {item.technique} {item.isCurrent ? 
                              <span className="font-bold">(Current Rank)</span> : ""}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            <p className="mb-1">* This report shows techniques from {selectedRank} and all previous ranks.</p>
            <p>* "Current Rank" indicates techniques required for your current rank.</p>
          </div>
        </div>
      </div>
    );
  }

  // Main App View
  return (
    <div className="max-w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lemon Hill Aikido Test Preparation</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select your rank:</label>
        <select
          className="border rounded p-2 w-full max-w-xs"
          value={selectedRank}
          onChange={(e) => setSelectedRank(e.target.value)}
        >
          {rankOrder.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="bg-red-200 px-3 py-1 rounded-md">Need Work: {countConfidence(1)}/{totalTechniques}</div>
        <div className="bg-yellow-200 px-3 py-1 rounded-md">OK: {countConfidence(2)}/{totalTechniques}</div>
        <div className="bg-green-200 px-3 py-1 rounded-md">Confident: {countConfidence(3)}/{totalTechniques}</div>
      </div>

      <div className="mb-2 flex items-center gap-4">
        <div className="text-sm">Click techniques to cycle through confidence levels.</div>
        <div className="flex gap-2">
          <button 
            onClick={toggleReportMode}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            View Training Report
          </button>
          <a 
            href="https://www.paypal.com/ncp/payment/5PQ8DNENFCURW" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-md border border-blue-300 inline-flex items-center"
          >
            <span className="mr-1">❤️</span>
            <span className="font-medium">Donate</span>
          </a>
        </div>
      </div>

      <div className="border rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 min-w-32">{selectedRank}</th>
              {attackTypes.map((attackType) => (
                <th key={attackType} className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                  {attackType}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-2 whitespace-nowrap sticky left-0 bg-white font-medium">Techniques</td>
              {attackTypes.map((attackType) => (
                <td key={attackType} className="px-2 py-2 align-top">
                  {(techniquesByAttackType[attackType] || []).map(({ technique, rank, isCurrent }) => {
                    const lvl = getConfidenceLevel(technique, attackType, rank);
                    const nextLvl = lvl === 3 ? 1 : lvl + 1;
                    return (
                      <div
                        key={`${rank}-${technique}`}
                        className={`mb-1 p-1 rounded cursor-pointer ${getColorClass(lvl)} ${isCurrent ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                        onClick={() => updateConfidence(technique, attackType, rank, nextLvl)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{technique}</span>
                          {/* <span className="text-xs text-gray-500">{rank}</span> */}
                        </div>
                      </div>
                    );
                  })}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AikikaiTestPrep;
