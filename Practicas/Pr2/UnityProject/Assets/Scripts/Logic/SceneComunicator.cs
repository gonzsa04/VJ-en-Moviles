using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneComunicator : MonoBehaviour
{
    public static SceneComunicator instance;
    [HideInInspector]
    public int difficultyLevel;
    [HideInInspector]
    public int[] numLevels;
    [HideInInspector]
    public int[] numLevelsUnLocked;
    [HideInInspector]
    public int numLevel;
    [HideInInspector]
    public int numLevelInCurrentDifficulty;
    [HideInInspector]
    public int totalNumLevels;
    [HideInInspector]
    public int money;

    void Awake()
    {
        instance = this;

        money = 0; // leer
        DontDestroyOnLoad(this.gameObject);
    }

    void Start()
    {
        totalNumLevels = 0;
        numLevelsUnLocked = new int[numLevels.Length];
        for (int i = 0; i < numLevels.Length; i++)
        {
            numLevelsUnLocked[i] = 1; // leer
            totalNumLevels += numLevels[i];
        }
    }
}
