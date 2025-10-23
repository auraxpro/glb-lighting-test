'use client'

import { useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import ControlsPanel from '@/components/ControlsPanel'
import ErrorBoundary from '@/components/ErrorBoundary'

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="scene-container">
      <div className="loading">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading 3D Engine...</div>
          <div style={{ fontSize: '14px', color: '#888' }}>Initializing Three.js and WebGL</div>
        </div>
      </div>
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
  part1Color: string
  part2Color: string
  part3Color?: string    // Optional - only for 4-piece model
  part4Color?: string    // Optional - only for 4-piece model
  selectedModel: string
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
  shadowOpacity: 0.3,
  part1Color: '#666666',
  part2Color: '#aaaaaa',
  part3Color: '#888888',
  part4Color: '#999999',
  selectedModel: '4-piece.glb'
}

export default function Home() {
  const [lightingSettings, setLightingSettings] = useState<LightingSettings>(defaultSettings)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSettingsChange = useCallback((newSettings: Partial<LightingSettings>) => {
    try {
      // Clear any pending updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      // Debounce the settings update to prevent rapid changes
      updateTimeoutRef.current = setTimeout(() => {
        setLightingSettings(prev => {
          try {
            return { ...prev, ...newSettings }
          } catch (error) {
            console.error('Error updating lighting settings:', error)
            return prev // Return previous settings if update fails
          }
        })
      }, 50) // 50ms debounce
    } catch (error) {
      console.error('Error in handleSettingsChange:', error)
    }
  }, [])

  const handleExportSettings = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      settings: lightingSettings,
      metadata: {
        version: '1.0.0',
        description: 'GLB Lighting Test Settings Export',
        usage: 'Import these settings into your production configurator',
        modelUsed: lightingSettings.selectedModel,
        availableModels: ['2-piece.glb', '4-piece.glb']
      }
    }

    // Create downloadable JSON file
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const modelName = lightingSettings.selectedModel.replace('.glb', '')
    const exportFileDefaultName = `lighting-settings-${modelName}-${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    // Show success message
    alert('Settings exported successfully! Check your downloads folder and browser console.')
  }, [lightingSettings])

  return (
    <main>
      <ErrorBoundary>
        <Scene lightingSettings={lightingSettings} />
      </ErrorBoundary>
      <ControlsPanel 
        onSettingsChange={handleSettingsChange}
        onExportSettings={handleExportSettings}
      />
      
      {/* Quick Export Button */}
      <button 
        className="export-button"
        onClick={handleExportSettings}
        title="Export current lighting settings as JSON"
      >
        Export Settings
      </button>
    </main>
  )
}
