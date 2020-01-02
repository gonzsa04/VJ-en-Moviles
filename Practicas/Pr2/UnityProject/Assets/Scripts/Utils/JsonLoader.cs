using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using SimpleJSON;

/// <summary>
/// Clase cargadora de niveles a partir de .json
/// Los carga y guarda su informacion en un dicionario, cuyas claves seran el numero de cada nivel
/// Devolvera la informacion de un nivel dada su clave
/// </summary>
public class JsonLoader
{
    private Dictionary<int, LevelInfo> levels_;
    private JSONNode rawJson_;

    [System.Serializable]
    public struct SaveInfo
    {
        public int money;
        public int medals;
        public int[] levelsUnlocked;
        public int challengeTimeLeft;
        public int currentTime;
        public string hash;
    }

    public struct HeaderInfo
    {
        public int numDifficulties;
        public int[] numLevels;
    }

    /// <summary>
    /// Informacion de cada nivel: casillas que lo forman y el camino a seguir para resolverlo
    /// </summary>
    public struct LevelInfo
    {
        public string[] layout_;
        public int[,] path_;
    }

    /// <summary>
    /// Carga un nivel y lo anyade al diccionario de niveles, siendo su clave el numero del nivel
    /// </summary>
    /// <param name="level">nivel a cargar</param>
    private void LoadLevel(JSONNode level)
    {
        LevelInfo levelInfo = new LevelInfo();
        levelInfo.layout_ = new string[level["layout"].Count];
        levelInfo.path_ = new int[level["path"].Count, level["path"][0].Count];

        for(int i = 0; i < levelInfo.layout_.Length; i++)
        {
            levelInfo.layout_[i] = level["layout"][i];
        }

        for (int i = 0; i < levelInfo.path_.GetLength(0); i++)
        {
            for (int j = 0; j < levelInfo.path_.GetLength(1); j++)
            {
                levelInfo.path_[i, j] = level["path"][i][j];
            }
        }

        levels_.Add(level["index"], levelInfo);
    }

    public JsonLoader() {
        levels_ = new Dictionary<int, LevelInfo>();
    }

    public void SetJson(string json)
    {
        rawJson_ = JSON.Parse(json);
    }

    /// <summary>
    /// Carga todos los niveles, que se anyadiran al diccionario de niveles
    /// </summary>
    public void LoadAllLevels()
    {
        for (int i = 0; i < rawJson_["levels"].Count; i++)
        {
            LoadLevel(rawJson_["levels"][i]);
        }
    }

    /// <summary>
    /// Devuelve la informacion de un nivel buscando en el diccionario por su clave
    /// </summary>
    /// <param name="number">clave del nivel a devolver</param>
    /// <returns></returns>
    public LevelInfo LoadByNumber(int number)
    {
        return levels_[number]; 
    }

    public HeaderInfo LoadHeader()
    {
        HeaderInfo headerInfo;
        headerInfo.numDifficulties = rawJson_["header"]["numDifficulties"];
        headerInfo.numLevels = new int[headerInfo.numDifficulties];
        for (int i = 0; i < headerInfo.numDifficulties; i++)
        {
            headerInfo.numLevels[i] = rawJson_["header"]["levelsPerDifficulty"][i];
        }
        return headerInfo;
    }

    public SaveInfo LoadSaveInfo()
    {
        SaveInfo saveInfo;
        saveInfo.money = rawJson_["money"];
        saveInfo.medals = rawJson_["medals"];
        saveInfo.challengeTimeLeft = rawJson_["challengeTimeLeft"];
        saveInfo.currentTime = rawJson_["currentTime"];
        saveInfo.levelsUnlocked = new int[rawJson_["levelsUnlocked"].Count];
        saveInfo.hash = rawJson_["hash"];

        for (int i = 0; i < saveInfo.levelsUnlocked.Length; i++)
        {
            saveInfo.levelsUnlocked[i] = rawJson_["levelsUnlocked"][i];
        }

        return saveInfo;
    }
}
