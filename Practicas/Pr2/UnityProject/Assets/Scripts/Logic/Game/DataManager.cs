using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.IO;

/// <summary>
/// Componente del Manager de la escena LoadScene. Carga y guarda las partidas, carga los niveles
/// y gestiona la informacion entre escenas durante la ejecucion de la aplicacion
/// </summary>
public class DataManager : MonoBehaviour
{
    /// <summary>
    /// Informacion de cada dificultad: numero de niveles que tiene, numero de niveles debloqueados
    /// y nivel actual que quiere jugarse
    /// </summary>
    [HideInInspector]
    public struct DifficultyInfo
    {
        public int numLevels;      
        public int numLevelsUnLocked;
        public int currentLevel;    
    }

    public static DataManager instance;

    [HideInInspector]
    public DifficultyInfo[] difficultiesInfo;
    [HideInInspector]
    public int money;
    [HideInInspector]
    public int medals;
    [HideInInspector]
    public int challengeTimeLeft;
    [HideInInspector]
    public int giftTimeLeft;
    [HideInInspector]
    public int currentTime;
    [HideInInspector]
    public int day;

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

    // inicializacion de atributos y lectura de todos los niveles
    // le indicamos que este objeto no debe destruirse entre escenas
    void Awake()
    {
        instance = this;
        jsonLoader = new JsonLoader();
        jsonLoader.SetJson(rawJsonLevels.text);
        jsonLoader.LoadAllLevels();

        money = 0;
        medals = 0;
        challengeTimeLeft = 0;
        giftTimeLeft = 0;
        currentTime = 0;
        day = 1;
        
        DontDestroyOnLoad(this.gameObject);
    }

    // carga los datos de partida guardados y va a la escena del menu
    void Start()
    {
        totalNumLevels = 0;
        Load();
        SceneManager.LoadScene("MenuScene");
    }

    /// <summary>
    /// Guarda los datos de la partida actual: dinero, retos, tiempo restante del regalo y los retos y
    /// ultimo nivel desbloqueado de cada dificultad, y los encripta con un hash
    /// </summary>
    public void Save()
    {
        using (StreamWriter stream = new StreamWriter(Application.persistentDataPath + saveInfoRoute_))
        {
            saveInfo_.money = money;
            saveInfo_.medals = medals;
            saveInfo_.challengeTimeLeft = challengeTimeLeft;
            saveInfo_.giftTimeLeft = giftTimeLeft;

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

    /// <summary>
    /// Guarda la informacion de la partida actual y el tiempo actual (dia de 1 a 366 y hora actual en segundos)
    /// </summary>
    public void SaveWithTime()
    {
        currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
        day = System.DateTime.Now.Date.DayOfYear;
        Save();
    }

    // carga informacion de una partida guardada si la hubiera, si no, carga una partida con los valores iniciales
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
        giftTimeLeft = saveInfo_.giftTimeLeft;
        currentTime = saveInfo_.currentTime;
        day = saveInfo_.day;

        for (int i = 0; i < difficultiesInfo.Length; i++)
        {
            difficultiesInfo[i].numLevelsUnLocked = saveInfo_.levelsUnlocked[i];
            difficultiesInfo[i].numLevels = headerInfo.numLevels[i];
            totalNumLevels += difficultiesInfo[i].numLevels;
        }
    }

    // carga una partida guardada en route. Comprueba si la informacion no ha sido modificada. De ser asi,
    // carga una partida con los valores iniciales
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

    // carga una partida con los valores iniciales
    private void LoadDefault()
    {
        saveInfo_.money = money = 0;
        saveInfo_.medals = medals = 0;
        saveInfo_.challengeTimeLeft = 0;
        saveInfo_.giftTimeLeft = 0;
        saveInfo_.currentTime = 0;
        saveInfo_.day = System.DateTime.Now.DayOfYear;
        saveInfo_.levelsUnlocked = new int[difficultiesInfo.Length];
        saveInfo_.hash = "";

        for (int i = 0; i < saveInfo_.levelsUnlocked.Length; i++)
        {
            saveInfo_.levelsUnlocked[i] = 1;
            difficultiesInfo[i].numLevelsUnLocked = 1;
        }
    }

    // manda encriptar los datos guardados
    private string Encrypt(string file)
    {
        string firstHash = MD5Encrypter.Md5Sum(file);
        return MD5Encrypter.Md5Sum(hashHeader + firstHash);
    }

    // determina si la informacion de los datos guardados ha sido modificada
    private bool HasInfoChanged()
    {
        JsonLoader.SaveInfo aux = saveInfo_;
        aux.hash = "";

        string json = JsonUtility.ToJson(aux);

        aux.hash = Encrypt(json);

        return (aux.hash != saveInfo_.hash);
    }

    // cuando la aplicacion sale de foco, se guarda la informacion de la partida actual con el tiempo actual
    private void OnApplicationFocus(bool focus)
    {
        if (!focus)
            SaveWithTime();
    }

    // cuando la aplicacion se cierra, se guarda la informacion de la partida actual con el tiempo actual
    private void OnApplicationQuit()
    {
        SaveWithTime();
    }
}
