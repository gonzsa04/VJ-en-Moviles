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
    public RectTransform scrollTrans;
    public RectTransform buttonPanelTrans;
    public GameObject challengePanel;
    public GameObject notEnoughMoneyText;
    public RewardedAds rewardedComp;

    public GameObject giftPanel;
    public GameObject giftButton;
    public GameObject giftDisabled;
    public GameObject giftButtonBig;
    public GameObject rewardPanel;
    public Text giftMoneyText;

    public Timer timerChallenge_;
    public Timer timerGift_;
    private static LoadManager loadManager_;

    void Awake()
    {
        loadManager_ = LoadManager.instance;
        timerChallenge_.SetMethod(DeactivateChallengeTimer);
        timerGift_.SetMethod(ActivateGift);
        challengePanel.SetActive(false);
        giftDisabled.SetActive(false);
        giftPanel.SetActive(false);
    }

    void Start()
    {
        ManageTimer();
        rewardedComp.SetRewardMethod(GoToChallenge);

        moneyText.text = loadManager_.money.ToString();
        medalsText.text = loadManager_.medals.ToString();
        for(int i = 0; i < difficultyTexts.Length; i++) {
            difficultyTexts[i].text = string.Format("{0}/{1}", 
                loadManager_.difficultiesInfo[i].numLevelsUnLocked, loadManager_.difficultiesInfo[i].numLevels);
        }

        FitPosition();
    }

    private void ManageTimer()
    {
        int currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
        int diff = Mathf.Abs(currentTime - loadManager_.currentTime);
        timerChallenge_.SetTime(loadManager_.challengeTimeLeft - diff);
        timerGift_.SetTime(loadManager_.giftTimeLeft - diff);


        if (loadManager_.fromChallenge) timerChallenge_.Reset();
        loadManager_.fromChallenge = false;
        timerChallenge_.SetTime(0);// debug
        SetTimer(!timerChallenge_.IsTimerFinished());
        if (!timerGift_.IsTimerFinished()) DeactivateGift();
        else ActivateGift();
    }

    private void FitPosition()
    {
        Vector3[] corners = new Vector3[4];
        scrollTrans.GetWorldCorners(corners);
        float yTargetCorner = corners[1].y;
        buttonPanelTrans.GetWorldCorners(corners);
        float yCorner = corners[1].y;

        buttonPanelTrans.transform.position = new Vector2(buttonPanelTrans.transform.position.x,
            buttonPanelTrans.transform.position.y - (yCorner - yTargetCorner));
    }

    public void ActivateChallengeTimer()
    {
        SetTimer(true);
    }

    public void DeactivateChallengeTimer()
    {
        SetTimer(false);
    }



    private void SetTimer(bool active)
    {
        timerChallenge_.enabled = active;
        timerPanel.SetActive(active);
        challengeButtonComp.enabled = !active;
    }

    private void OnApplicationQuit()
    {
        loadManager_.challengeTimeLeft = (int)timerChallenge_.GetTime();
        loadManager_.giftTimeLeft = (int)timerGift_.GetTime();
        loadManager_.currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
        loadManager_.SaveWithTime();
    }

    public void GoToLevelSelector(int difficulty)
    {
        loadManager_.difficultyLevel = difficulty;
        SceneManager.LoadScene("LevelSelectorScene");
    }

    public void StartChallenge()
    {
        challengePanel.SetActive(true);
    }

    public void BackToMenu()
    {
        challengePanel.SetActive(false);
    }

    public void ActivateReward()
    {
        giftButtonBig.SetActive(false);
        rewardPanel.SetActive(true);

        int money = Random.Range(20, 41);
        loadManager_.money += money;
        moneyText.text = loadManager_.money.ToString();
        giftMoneyText.text = string.Format("+{0}", money);
    }

    public void ActivateBigGift()
    {
        giftButtonBig.SetActive(true);
        giftPanel.SetActive(true);
        rewardPanel.SetActive(false);
    }

    public void ActivateGift()
    {
        giftButton.SetActive(true);
        giftDisabled.SetActive(false);
        timerGift_.Reset();
    }

    public void DeactivateGift()
    {
        giftPanel.SetActive(false);
        giftButton.SetActive(false);
        giftDisabled.SetActive(true);
    }

    public void PayForChallenge(int howMany)
    {
        if (loadManager_.money >= howMany)
        {
            loadManager_.money -= howMany;
            GoToChallenge();
        }
        else
        {
            notEnoughMoneyText.SetActive(true);
        }
    }

    private void GoToChallenge()
    {
        SceneManager.LoadScene("ChallengeScene");
    }

    public void QuitApplication()
    {
        Application.Quit();
    }
}
