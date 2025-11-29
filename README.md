# Pakistani Fashion Clothing sites crawler and stable diffusion fine-tuning pipeline for creating a Pakistani Clothing Design Model


# Methodology

1. Clothing Crawler

This is a [pakistani fashion clothing site crawler](https://github.com/MuhammadMahad/pakistani-fashion-crawler-and-stable-diffusion-pipeline/tree/main) developed using the typescript library [Crawlee](https://crawlee.dev/docs/introduction) to crawl Pakistani clothing sites to create a dataset of clothing images and their descriptions for fine-tuning a text to image model such as Stable Diffusion.

Extra care was taken to exclude data from:
- vulnerable demographics such as children
- non-clothing items such as fragnances, perfumes etc.

Once all the data was crawled, we got json files from each website with the image urls and descriptions. These were all concatenated using some simple scripts into a single folder called 'json-files' which due to size constraints on Github is not shared here.

2. Dataset Creation

These were then processed using 'crawlee-dataset-to-csv.ts' to generate a 'pakistani-fashion-dataset.csv' file with website names, product urls, product image urls and product descriptions.

Then using the 'process_jsons.sh' script, we downloaded the first image of each product and placed in a folder called train while also generating a metadata.jsonl file in which we appended in a row its filename and description text.

Now we had a folder called 'train' with all the product images. We zipped this folder and then made a [jupyter notebook](https://colab.research.google.com/drive/1bc23ktDHBEgpHw9tGO5beW6E3b4aLgmD) in which we used [Salesforces BLIP2 model](https://huggingface.co/Salesforce/blip2-opt-2.7b) to generate normalized text descriptions of all our images and also generate our dataset which included the previously mentioned train folder as well as a new metadata.csv file with all the fileneames and normalized text descriptions. This dataset was uploaded to hugging face and can be found [here](https://huggingface.co/datasets/mohummadmahad/pakistani_fashion_dataset).

3. Stable Diffusion fine-tuning and model generation

Then by using huggingface's diffusers library, we finetuned the Stable Diffusion text to image model using our newly created dataset. The notebook for that can be found [here](https://colab.research.google.com/drive/16gpCF4jaT3gf9NkL9v2Hm2LwGcQ-ukl4). This process took a lot of time and GPU resources for which Google Colab was not enough. So I signed up for Digital Ocean's [Paperspace](https://www.paperspace.com/) cloud computing platform and rented some GPUs there which cost me about $200. 

After all was said and done, here is the [model](https://huggingface.co/mohummadmahad/pakistani-fashion-generator-model) I came up with. Pretty good for a first try I might say though of course not perfect.

# Challenges and Shortcomings

Here I will make a note of some challenges I faced during this whole process as well as where the model falls short.

1. This was my first time creating a dataset for use with a model on huggingface and performing ML-based tasks on my own outside of the classroom in a real world setting with messy data. I didn't knew how far I was going to get which is why I didn't bother documenting my work so the methodology above was written after the fact and contains a lot of superflous steps such as generating files that weren't later utilized at all. Furthermore, I didn't keep a strict eye on version control either and keeping everything in one place proved difficult since the notebooks had to be on paperspace, the models and datasets on huggingface and the crawler on github. This documentation is my attempt at bringing it all together as best I could.
2. The site crawler may have filtered away a lot of unwanted data outlined in Step 1 but it may have missed some things due to how the filters had to be manually coded based on each website's url pathing schemes.
3. I am unsure of what you are allowed to crawl on the web and the privacy and copyright infringement implications of that. That is an area I need to study more and be more cognizant about to ensure projects such as these fall under the appropriate legal and privacy constraints.
4. The model created wasn't perfect. It can miss the mark sometimes and the images it generates can be very low-quality.

# Conclusion

Overall, despite the various complications I had during the whole process and the sometimes lacklustre performance of the model, it was a really good learning experience for me, the lessons of which I hope to carry forward as I continue on my machine learning journey.



