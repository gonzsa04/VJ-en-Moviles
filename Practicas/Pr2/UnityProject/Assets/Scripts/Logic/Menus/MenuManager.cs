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

    private Timer timer_;
    private static LoadManager loadManager_;

    void Awake()
    {
        loadManager_ = LoadManager.instance;
        timer_ = GetComponent<Timer>();
        timer_.SetMethod(DeactivateTimer);
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
        timer_.SetTime(loadManager_.challengeTimeLeft - diff);

        if (loadManager_.fromChallenge) timer_.Reset();
        loadManager_.fromChallenge = false;
        timer_.SetTime(0);// debug
        SetTimer(!timer_.IsTimerFinished());
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

    private void OnDestroy()
    {
        loadManager_.challengeTimeLeft = (int)timer_.GetTime();
        loadManager_.currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
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

    public void ActivateGift()
    {
        giftButtonBig.SetActive(true);
        giftPanel.SetActive(true);
        rewardPanel.SetActive(false);
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
