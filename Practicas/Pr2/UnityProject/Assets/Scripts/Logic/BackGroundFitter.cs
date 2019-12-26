using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BackGroundFitter : MonoBehaviour
{
    public Sprite background;

    void Awake()
    {
        RectTransform canvasRect = GetComponent<RectTransform>();

        float currentHeight = 0;

        do
        {
            GameObject image = new GameObject();
            Image imageComp = image.AddComponent(typeof(Image)) as Image;
            imageComp.sprite = background;

            image.transform.SetParent(transform);
            image.transform.SetSiblingIndex(0);
            image.transform.localScale = new Vector2(1, 1);

            RectTransform rectTrans = image.GetComponent<RectTransform>();
            float height = background.rect.height * canvasRect.rect.width / background.rect.width;
            rectTrans.sizeDelta = new Vector2(canvasRect.rect.width, height);
            rectTrans.anchoredPosition = new Vector2(0, canvasRect.rect.height / 2 - rectTrans.rect.height / 2 - currentHeight);
            currentHeight += height;

        } while (currentHeight <= canvasRect.rect.height);
    }
}
