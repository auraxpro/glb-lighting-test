'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ControlsPanel from '@/components/ControlsPanel'

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="scene-container">
      <div className="loading">Loading 3D Scene...</div>
    </div>
  )
})

interface LightingSettings {
  hdriIntensity: number
  directionalLightIntensity: number
  directionalLightAngle: number
  ambientLightColor: string
  ambientLightIntensity: number
  environmentRotation: number
  roughness: number
  metalness: number
  backgroundType: 'hdri' | 'color' | 'studio'
  backgroundColor: string
  enableShadows: boolean
  shadowOpacity: number
}

const defaultSettings: LightingSettings = {
  hdriIntensity: 1,
  directionalLightIntensity: 1,
  directionalLightAngle: 45,
  ambientLightColor: '#ffffff',
  ambientLightIntensity: 0.5,
  environmentRotation: 0,
  roughness: 0.5,
  metalness: 0.0,
  backgroundType: 'hdri',
  backgroundColor: '#2a2a2a',
  enableShadows: true,
  shadowOpacity: 0.3
}

export default function Home() {
  const [lightingSettings, setLightingSettings] = useState<LightingSettings>(defaultSettings)

  const handleSettingsChange = useCallback((newSettings: Partial<LightingSettings>) => {
    setLightingSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const handleExportSettings = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      settings: lightingSettings,
      metadata: {
        version: '1.0.0',
        description: 'GLB Lighting Test Settings Export',
        usage: 'Import these settings into your production configurator'
      }
    }

    // Create downloadable JSON file
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `lighting-settings-${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    // Also log to console for easy copying
    console.log('🎨 Exported Lighting Settings:', exportData)
    
    // Show success message
    alert('Settings exported successfully! Check your downloads folder and browser console.')
  }, [lightingSettings])

  return (
    <main>
      <Scene lightingSettings={lightingSettings} />
      <ControlsPanel 
        onSettingsChange={handleSettingsChange}
        onExportSettings={handleExportSettings}
      />
      
      {/* Info Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        maxWidth: '300px',
        zIndex: 1000
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#007acc' }}>🎨 GLB Lighting Test</h3>
        <p style={{ margin: '5px 0', lineHeight: '1.4' }}>
          • Use the controls panel to adjust lighting and materials
        </p>
        <p style={{ margin: '5px 0', lineHeight: '1.4' }}>
          • Drag to rotate, scroll to zoom, right-click to pan
        </p>
        <p style={{ margin: '5px 0', lineHeight: '1.4' }}>
          • Export settings when you find the perfect look
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#888' }}>
          Place your GLB model in <code>/public/models/4-piece.glb</code>
        </p>
      </div>

      {/* Quick Export Button */}
      <button 
        className="export-button"
        onClick={handleExportSettings}
        title="Export current lighting settings as JSON"
      >
        📥 Export Settings
      </button>
    </main>
  )
}
