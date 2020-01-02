using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PopUpAnimation : MonoBehaviour
{
    public float smallScale = 1.05f;
    public float bigScale = 1.3f;
    public float finishScale = 1.25f;

    public float smallToBigFactor = 0.1f;
    public float bigToFinishFactor = 0.1f;

    public float smallToBigRate = 0.05f;
    public float bigToFinishRate = 0.05f;

    private void OnEnable()
    {
        transform.localScale = new Vector2(smallScale, smallScale);
        StartSmallToBig();
    }

    private void StartSmallToBig()
    {
        StartCoroutine(SmallToBigAnimation());
    }

    private IEnumerator SmallToBigAnimation()
    {
        while (transform.localScale.x <= bigScale)
        {
            transform.localScale = new Vector2(transform.localScale.x + smallToBigFactor, transform.localScale.y + smallToBigFactor);
            yield return new WaitForSeconds(smallToBigRate);
        }

        StartBigToFinish();
    }

    private void StartBigToFinish()
    {
        StartCoroutine(BigToFinishAnimation());
    }

    private IEnumerator BigToFinishAnimation()
    {
        while (transform.localScale.x >= finishScale)
        {
            transform.localScale = new Vector2(transform.localScale.x - smallToBigFactor, transform.localScale.y - smallToBigFactor);
            if (transform.localScale.x > finishScale)
                transform.localScale = new Vector2(finishScale, finishScale);
            yield return new WaitForSeconds(smallToBigRate);
        }
    }
}
