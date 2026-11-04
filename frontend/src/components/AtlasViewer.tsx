import { lazy, Suspense, useState } from 'react'
import './AtlasViewer.css'

const Vitessce = lazy(async () => {
  const module = await import('vitessce')
  return { default: module.Vitessce }
})

const vitessceConfig = {
  version: '1.0.0',
  initStrategy: 'auto',
  name: 'Single-Cell Atlas of the Oral Cavity',
  description: 'Single-cell transcriptomic atlas of oral tissues.',

  datasets: [
    {
      uid: 'oral-atlas',
      name: 'Single-Cell Atlas of he oral cavity',
      files: [
        {
          fileType: 'anndata.zarr',
          url: new URL(
            `${import.meta.env.BASE_URL}data/test.zarr`,
            window.location.origin
          ).href,
          coordinationValues: {
            obsType: 'cell',
            featureType: 'gene',
            featureValueType: 'expression',
          },
          options: {
            obsEmbedding: [
              {
                path: 'obsm/X_umap',
                embeddingType: 'UMAP',
              },
            ],
            obsSets: [
              {
                name: 'Cell populations',
                path: 'obs/annotation_1',
              },
              {
                name: 'Cell types',
                path: 'obs/annotation_2',
              },
            ],
            obsFeatureMatrix: {
              path: 'X',
            },
          },
        },
      ],
    },
  ],
  
  coordinationSpace: {
    dataset: { A: 'oral-atlas' },
    embeddingType: { A: 'UMAP' },
    obsType: { A: 'cell' },
    featureType: { A: 'gene' },
    featureValueType: { A: 'expression' },
    featureValueColormap: { A: 'plasma' },
    featureValueColormapRange: { A: [0, 1] },
  },
  layout: [
    {
      component: 'scatterplot',
      coordinationScopes: {
        dataset: 'A',
        embeddingType: 'A',
        obsType: 'A',
        featureType: 'A',
        featureValueType: 'A',
        featureValueColormap: 'A',
        featureValueColormapRange: 'A',
      },
      x: 0, y: 0, w: 8, h: 8,
    },
    {
      component: 'obsSets',
      coordinationScopes: {
        dataset: 'A',
        obsType: 'A',
      },
      x: 8, y: 0, w: 4, h: 8,
    },
    {
      component: 'featureList',
      coordinationScopes: {
        dataset: 'A',
        featureType: 'A',
      },
      x: 0, y: 8, w: 4, h: 4,
    },
    {
      component: 'heatmap',
      coordinationScopes: {
        dataset: 'A',
        obsType: 'A',
        featureType: 'A',
        featureValueType: 'A',
        featureValueColormap: 'A',
        featureValueColormapRange: 'A',
      },
      x: 4, y: 8, w: 8, h: 4,
    },
  ],

}


export default function AtlasViewer() {
  const [colormap, setColormap] = useState('plasma')

  const config = {
    ...vitessceConfig,
    coordinationSpace: {
      ...vitessceConfig.coordinationSpace,
      featureValueColormap: { A: colormap },
    },
  }

  return (

      <div className="atlas-viewer">
        <Suspense fallback={
          <div className="atlas-loading">
            Loading cellular atlas...
          </div>
        }>
          <Vitessce config={config} theme="dark" height={720} />
        </Suspense>
      </div>
  )
}

