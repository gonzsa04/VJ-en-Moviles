using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public Text moneyText;
    public Text medalsText;
    public Text[] difficultyTexts;
    public Button challengeButtonComp;
    public GameObject timerPanel;

    private Timer timer_;
    private static LoadManager loadManager_;

    void Awake()
    {
        loadManager_ = LoadManager.instance;
        timer_ = GetComponent<Timer>();
        timer_.SetMethod(DeactivateTimer);
    }

    void Start()
    {
        timer_.SetTime(0);//lo que leas
        //timer_.SetTime(loadManager_.challengeTime);

        if (loadManager_.fromChallenge) timer_.Reset();
        loadManager_.fromChallenge = false;
        SetTimer(!timer_.IsTimerFinished());

        moneyText.text = loadManager_.money.ToString();
        medalsText.text = loadManager_.medals.ToString();
        for(int i = 0; i < difficultyTexts.Length; i++) {
            difficultyTexts[i].text = string.Format("{0}/{1}", 
                loadManager_.difficultiesInfo[i].numLevelsUnLocked, loadManager_.difficultiesInfo[i].numLevels);
        }
    }

    public void ActivateTimer()
    {
        SetTimer(true);
    }

    public void DeactivateTimer()
    {
        SetTimer(false);
    }

    private void SetTimer(bool active)
    {
        timer_.enabled = active;
        timerPanel.SetActive(active);
        challengeButtonComp.enabled = !active;
    }

    public void GoToLevelSelector(int difficulty)
    {
        loadManager_.difficultyLevel = difficulty;
        SceneManager.LoadScene("LevelSelectorScene");
    }

    public void GoToChallenge()
    {
        SceneManager.LoadScene("ChallengeScene");
    }

    public void QuitApplication()
    {
        Application.Quit();
    }
}
