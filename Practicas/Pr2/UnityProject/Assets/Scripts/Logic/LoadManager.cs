using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.IO;

public class LoadManager : MonoBehaviour
{
    [HideInInspector]
    public struct DifficultyInfo
    {
        public int numLevels;      //numero de niveles de esta dificultad
        public int numLevelsUnLocked;
        public int currentLevel;    //nivel actual personal de la dificultad
    }

    public static LoadManager instance;

    [HideInInspector]
    public DifficultyInfo[] difficultiesInfo;
    [HideInInspector]
    public int money;
    [HideInInspector]
    public int medals;

    [HideInInspector]
    public int difficultyLevel;
    [HideInInspector]
    public int numLevel;    //nivel actual respecto a todas las dificultades
    [HideInInspector]
    public int totalNumLevels;

    [HideInInspector]
    public JsonLoader jsonLoader;

    [Tooltip("Json del que leer todos los niveles")]
    public TextAsset rawJsonLevels;

    private JsonLoader.SaveInfo saveInfo_;
    private string saveInfoRoute_ = "/saveInfo.json";
    //"D:/Users/Gonzalo/Desktop/UCM/MOVILES/VJ-en-Moviles/Practicas/Pr2/UnityProject/Assets/Levels/saveInfo.json"

    void Awake()
    {
        instance = this;
        jsonLoader = new JsonLoader();
        jsonLoader.SetJson(rawJsonLevels.text);
        jsonLoader.LoadAllLevels();

        money = 0;
        medals = 0;
        DontDestroyOnLoad(this.gameObject);
    }

    void Start()
    {
        totalNumLevels = 0;
        Load();
        SceneManager.LoadScene("MenuScene");
    }

    public void Save()
    {
        using (StreamWriter stream = new StreamWriter(Application.persistentDataPath + saveInfoRoute_))
        {
            saveInfo_.money = money;
            saveInfo_.medals = medals;
            for (int i = 0; i < saveInfo_.levelsUnlocked.Length; i++)
            {
                saveInfo_.levelsUnlocked[i] = difficultiesInfo[i].numLevelsUnLocked;
            }

            string json = JsonUtility.ToJson(saveInfo_);
            stream.Write(json);
        }
    }

    private void Load()
    {
        JsonLoader.HeaderInfo headerInfo = jsonLoader.LoadHeader();
        difficultiesInfo = new DifficultyInfo[headerInfo.numDifficulties];

        if (System.IO.File.Exists(Application.persistentDataPath + saveInfoRoute_))
            LoadFromFile(Application.persistentDataPath + saveInfoRoute_);
        else LoadDefault();

        money = saveInfo_.money;
        medals = saveInfo_.medals;

        for (int i = 0; i < difficultiesInfo.Length; i++)
        {
            difficultiesInfo[i].numLevelsUnLocked = saveInfo_.levelsUnlocked[i];
            difficultiesInfo[i].numLevels = headerInfo.numLevels[i];
            totalNumLevels += difficultiesInfo[i].numLevels;
        }

    }

    private void LoadFromFile(string route)
    {
        using (StreamReader stream = new StreamReader(route))
        {
            jsonLoader.SetJson(stream.ReadToEnd());
            saveInfo_ = jsonLoader.LoadSaveInfo();
        }
    }

    private void LoadDefault()
    {
        saveInfo_.money = 0;
        saveInfo_.medals = 0;
        saveInfo_.levelsUnlocked = new int[difficultiesInfo.Length];

        for (int i = 0; i < saveInfo_.levelsUnlocked.Length; i++)
        {
            saveInfo_.levelsUnlocked[i] = 1;
        }
    }
}
