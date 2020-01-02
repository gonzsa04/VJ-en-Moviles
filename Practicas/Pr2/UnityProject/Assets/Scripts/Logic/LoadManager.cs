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
    public int challengeTimeLeft;
    [HideInInspector]
    public int currentTime;

    [HideInInspector]
    public bool fromChallenge;
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
    private string hashHeader = "JorGaloOneLine1998-UCM-GDV-2019-2020";

    void Awake()
    {
        instance = this;
        jsonLoader = new JsonLoader();
        jsonLoader.SetJson(rawJsonLevels.text);
        jsonLoader.LoadAllLevels();

        money = 0;
        medals = 0;
        challengeTimeLeft = 0;
        currentTime = 0;

        fromChallenge = false;
        DontDestroyOnLoad(this.gameObject);
    }

    void Start()
    {
        totalNumLevels = 0;
        Load();
        SceneManager.LoadScene("MenuScene");
    }

    private void Save()
    {
        using (StreamWriter stream = new StreamWriter(Application.persistentDataPath + saveInfoRoute_))
        {
            saveInfo_.money = money;
            saveInfo_.medals = medals;
            saveInfo_.challengeTimeLeft = challengeTimeLeft;
            saveInfo_.currentTime = currentTime;

            for (int i = 0; i < saveInfo_.levelsUnlocked.Length; i++)
            {
                saveInfo_.levelsUnlocked[i] = difficultiesInfo[i].numLevelsUnLocked;
            }

            saveInfo_.hash = "";

            string json = JsonUtility.ToJson(saveInfo_);

            saveInfo_.hash = Encrypt(json);

            json = JsonUtility.ToJson(saveInfo_);

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
        challengeTimeLeft = saveInfo_.challengeTimeLeft;
        currentTime = saveInfo_.currentTime;

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

        if (HasInfoChanged())
        {
            LoadDefault();
            Save();
        }
    }

    private void LoadDefault()
    {
        saveInfo_.money = money = 0;
        saveInfo_.medals = medals = 0;
        saveInfo_.challengeTimeLeft = 0;
        saveInfo_.currentTime = 0;
        saveInfo_.levelsUnlocked = new int[difficultiesInfo.Length];
        saveInfo_.hash = "";

        for (int i = 0; i < saveInfo_.levelsUnlocked.Length; i++)
        {
            saveInfo_.levelsUnlocked[i] = 1;
            difficultiesInfo[i].numLevelsUnLocked = 1;
        }
    }

    private string Encrypt(string file)
    {
        string firstHash = MD5Encrypter.Md5Sum(file);
        return MD5Encrypter.Md5Sum(hashHeader + firstHash);
    }

    private bool HasInfoChanged()
    {
        JsonLoader.SaveInfo aux = saveInfo_;
        aux.hash = "";

        string json = JsonUtility.ToJson(aux);

        aux.hash = Encrypt(json);

        return (aux.hash != saveInfo_.hash);
    }

    private void SaveWithTime()
    {
        currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
        Save();

    }

    private void OnApplicationFocus(bool focus)
    {
        //SaveWithTime();
    }

    private void OnApplicationQuit()
    {
        SaveWithTime();
    }
}
