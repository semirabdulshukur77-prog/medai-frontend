// src/AgentContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

const AgentContext = createContext();

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState({
    diagnosisAgent: {
      active: true,
      confidence: 0.85,
      lastUsed: null,
      totalQueries: 0
    },
    recommendationAgent: {
      active: true,
      confidence: 0.78,
      lastUsed: null,
      totalQueries: 0
    },
    triageAgent: {
      active: true,
      confidence: 0.92,
      lastUsed: null,
      totalQueries: 0
    },
    pharmacyAgent: {
      active: false,
      confidence: 0.65,
      lastUsed: null,
      totalQueries: 0
    },
    radiologyAgent: {
      active: false,
      confidence: 0.72,
      lastUsed: null,
      totalQueries: 0
    },
    epidemiologyAgent: {
      active: true,
      confidence: 0.88,
      lastUsed: null,
      totalQueries: 0
    }
  });

  const [activeConversation, setActiveConversation] = useState([]);
  const [agentHistory, setAgentHistory] = useState([]);

  const activateAgent = useCallback((agentName) => {
    setAgents(prev => ({
      ...prev,
      [agentName]: {
        ...prev[agentName],
        active: true,
        lastUsed: new Date().toISOString()
      }
    }));
  }, []);

  const deactivateAgent = useCallback((agentName) => {
    setAgents(prev => ({
      ...prev,
      [agentName]: {
        ...prev[agentName],
        active: false
      }
    }));
  }, []);

  const queryAgent = useCallback(async (agentName, query) => {
    if (!agents[agentName]?.active) {
      throw new Error(`Agent ${agentName} is not active`);
    }

    // Simulate agent processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = generateAgentResponse(agentName, query);
        
        // Update agent stats
        setAgents(prev => ({
          ...prev,
          [agentName]: {
            ...prev[agentName],
            totalQueries: prev[agentName].totalQueries + 1,
            lastUsed: new Date().toISOString()
          }
        }));

        // Add to conversation
        const conversationItem = {
          id: Date.now(),
          agent: agentName,
          query,
          response,
          timestamp: new Date().toISOString()
        };

        setActiveConversation(prev => [...prev, conversationItem]);
        setAgentHistory(prev => [...prev, conversationItem]);

        resolve(response);
      }, 1500);
    });
  }, [agents]);

  const generateAgentResponse = (agentName, query) => {
    const responses = {
      diagnosisAgent: {
        en: `Based on your symptoms "${query}", I suspect this could be related to migraines or tension headaches. Please monitor your symptoms and consider consulting a neurologist if they persist.`,
        am: `በምልክቶችዎ "${query}" ላይ በመመርኮዝ፣ ይህ ማይግሬን ወይም የጭንቀት ራስ ምታት ሊሆን ይችላል። ምልክቶችዎን ይቆጣጠሩ እና ከቀጠሉ ነርቭ ሐኪም ማየት ያስቡ።`
      },
      recommendationAgent: {
        en: `For your condition, I recommend: 1. Rest in a quiet environment, 2. Stay hydrated, 3. Avoid caffeine, 4. Consider over-the-counter pain relief if needed.`,
        am: `ለሁኔታዎ፣ እመክራለሁ፡ 1. በሚታወቅ አካባቢ ይደርቁ፣ 2. ውሃ ይጠጡ፣ 3. ካፌን ያስወግዱ፣ 4. አስፈላጊ ከሆነ ከካውንተር ላይ የሚገኙ የህመም መድኃኒቶችን ያስቡ።`
      },
      triageAgent: {
        en: `Based on symptom severity, this appears to be a non-emergency case. However, if symptoms worsen or you experience vision changes, seek immediate medical attention.`,
        am: `በምልክት ከፍተኛነት ላይ በመመርኮዝ፣ ይህ ያልተጣራ ጉዳይ ይመስላል። ሆኖም ምልክቶች ከተባበሩ ወይም የማያቅ ለውጥ ካጋጠመዎት፣ ወዲያውኑ የጤና እርዳታ ይፈልጉ።`
      },
      epidemiologyAgent: {
        en: `In the Addis Ababa region, there has been an increase in similar symptoms reported this month. The local health department recommends increased hydration and rest.`,
        am: `በአዲስ አበባ ክልል፣ በዚህ ወር ተመሳሳይ ምልክቶች መጠቆም ጨምሯል። የአካባቢ የጤና ትህትና ውሃ መጠጣት እና ደረቅ መጨመር ይመክራል።`
      }
    };

    return responses[agentName] || {
      en: `Agent ${agentName} received your query. Processing...`,
      am: `ኤጄንት ${agentName} ጥያቄዎን ተቀብሏል። በማቀናበር ላይ...`
    };
  };

  const clearConversation = useCallback(() => {
    setActiveConversation([]);
  }, []);

  const getAgentStats = useCallback(() => {
    const activeAgents = Object.values(agents).filter(a => a.active).length;
    const totalQueries = Object.values(agents).reduce((sum, agent) => sum + agent.totalQueries, 0);
    const avgConfidence = Object.values(agents)
      .filter(a => a.active)
      .reduce((sum, agent) => sum + agent.confidence, 0) / activeAgents || 0;

    return {
      activeAgents,
      totalQueries,
      avgConfidence: Math.round(avgConfidence * 100)
    };
  }, [agents]);

  const value = {
    agents,
    activeConversation,
    agentHistory,
    activateAgent,
    deactivateAgent,
    queryAgent,
    clearConversation,
    getAgentStats
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
};