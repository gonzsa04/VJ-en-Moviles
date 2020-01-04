using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;

[RequireComponent(typeof(Button))]
public class RewardedAds : MonoBehaviour, IUnityAdsListener
{
    private string gameId = "1486550";
    private bool rewarded = false;

    Button myButton;
    public string myPlacementId = "rewardedVideo";
    public GameObject notReadyText;

    public delegate void RewardMethod(); // This defines what type of method you're going to call.
    private RewardMethod rewardMethod_; // This is the variable holding the method you're going to call.

    void Start()
    {
        myButton = GetComponent<Button>();
        notReadyText.SetActive(false);

        // Map the ShowRewardedVideo function to the button’s click listener:
        if (myButton) myButton.onClick.AddListener(ShowRewardedVideo);

        // Initialize the Ads listener and service:
        Advertisement.AddListener(this);
        Advertisement.Initialize(gameId, false);
    }

    public void SetRewardMethod(RewardMethod method)
    {
        rewardMethod_ = method;
    }

    // Implement a function for showing a rewarded video ad:
    void ShowRewardedVideo()
    {
        if (Advertisement.IsReady(myPlacementId))
        {
            rewarded = false;
            Advertisement.Show(myPlacementId);
        }
        else notReadyText.SetActive(true);
    }

    // Implement IUnityAdsListener interface methods:
    public void OnUnityAdsReady(string placementId)
    {
        // If the ready Placement is rewarded, activate the button: 
        if (placementId == myPlacementId)
        {
            myButton.interactable = true;
        }
    }

    public void OnUnityAdsDidFinish(string placementId, ShowResult showResult)
    {
        // Define conditional logic for each ad completion status:
        if (showResult == ShowResult.Finished && !rewarded)
        {
            rewarded = true;
            if(rewardMethod_ != null) rewardMethod_();
        }
        else if (showResult == ShowResult.Skipped)
        {
            // Do not reward the user for skipping the ad.
        }
        else if (showResult == ShowResult.Failed)
        {
            Debug.LogWarning("The ad did not finish due to an error.");
        }
    }

    public void OnUnityAdsDidError(string message)
    {
        // Log the error.
    }

    public void OnUnityAdsDidStart(string placementId)
    {
        // Optional actions to take when the end-users triggers an ad.
    }

    private void OnDestroy()
    {
        rewardMethod_ = null;
    }
}