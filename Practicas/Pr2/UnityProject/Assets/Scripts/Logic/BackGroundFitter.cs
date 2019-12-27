using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Componente del canvas que ajusta la imagen de fondo. Instancia las copias que sean necesarias
/// para cubrir todo el alto de la pantalla, ajustando el ancho de cada una de ellas al ancho de la
/// pantalla y reescalando su altura en la misma medida para evitar deformaciones
/// </summary>
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
