using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class ChallengeManager : MonoBehaviour
{
    public static ChallengeManager instance;
    public BoardManager boardManager;
    
    private int level_;
    Timer timerComponent_;

    private void Awake()
    {
        instance = this;
    }

    void Start()
    {
        level_ = Random.Range(1, SceneComunicator.instance.totalNumLevels + 1);
        timerComponent_ = gameObject.GetComponent<Timer>();
        
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    void Update()
    {
        if (timerComponent_.IsTimerFinished() || (boardManager.LevelCompleted() && !boardManager.isButtonDown))
            BackToMenu();
    }

    public void BackToMenu()
    {
       SceneManager.LoadScene("MenuScene");
    }
}
