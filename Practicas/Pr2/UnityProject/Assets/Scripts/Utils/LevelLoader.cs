using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using SimpleJSON;

public class LevelLoader
{
    private Dictionary<int, LevelInfo> levels_;
    private const string routeName_ = "/Levels/levels.json";

    public struct LevelInfo
    {
        public string[] layout_;
        public int[,] path_;
    }

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

    public LevelLoader() {
        levels_ = new Dictionary<int, LevelInfo>();
    }

    public void LoadAllLevels()
    {
        string json = File.ReadAllText(Application.dataPath + routeName_);
        JSONNode rawLevels = JSON.Parse(json);
        for (int i = 0; i < rawLevels["levels"].Count; i++)
        {
            LoadLevel(rawLevels["levels"][i]);
        }
    }

    public LevelInfo LoadByNumber(int number)
    {
        return levels_[number]; 
    }
}
