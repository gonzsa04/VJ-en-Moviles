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
    public int numLevel;
    [HideInInspector]
    public int money;

    private void Awake()
    {
        instance = this;
        money = 0; // leer
        DontDestroyOnLoad(this.gameObject);
    }

    void Update()
    {
        Debug.Log(money);
    }
}
